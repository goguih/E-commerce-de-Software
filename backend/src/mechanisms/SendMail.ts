import httpStatus from 'http-status';
import sgMail from '@sendgrid/mail';
import { constants } from '../utilities/constants';
import AppError from '../utilities/errors/AppError';
import { errors } from '../utilities/status';
import { MailType } from '../enumerators/mailType';

export default class SendMail {
  static async sendMail(data: any, mailType: number) {
    sgMail.setApiKey(constants.mail.sendGrid.apiKey);

    let options;

    if (mailType === MailType.PASSWORD_RECOVERY) {
      const { name, email, codeVerification } = data;
      options = await SendMail.passwordRecovery(name, email, codeVerification);
    } else {
      throw new AppError('Tipo de Email não foi informado', httpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      await sgMail.send(options);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  static async passwordRecovery(name: string, email: string, code: string) {  
    const options = {
      to: email,
      from: constants.mail.emailFrom,
      templateId: constants.mail.sendGrid.templateId,
      dynamic_template_data: {
        name,
        code,
      }
    }

    return options;
  }
}
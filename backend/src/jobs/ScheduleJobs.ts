import { CronJob } from 'cron';
import UserService from '../services/UserService';

export default class ScheduleJobs {
  static async scheduleExpireCodeVerification(cpf: string) {
    try {
      const job = new CronJob(`0 */2 * * * *`, async () => {
        await UserService.update({ cpf, user: { codeVerification: '' } });
        job.stop();
      }, null, true, 'America/Sao_Paulo');
    } catch(err) {
      console.log(err);
    }
  }
}
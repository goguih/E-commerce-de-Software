export const dados = [
  CriarDado("Windows 11", 1594, "Microsoft", "Uma merda que só trava", 2, 'https://tm.ibxk.com.br/2021/08/13/13114553550126.jpg?ims=1920x1080'),
  CriarDado("Adobe Photoshop", 1237, "Adobe", "Uma coisa espetacular", 4, 'https://www.academiaferoli.com.br/thumbs-1/6302_imgs-Photoshop-2021-novos-recursos-de-software-do-windows.jpeg'),
  CriarDado("Aster", 165, "ASTER", "Uma merda", 4, 'https://khandishnetwork.com/wp-content/uploads/2021/06/Aster-Receivers.png'),
  CriarDado("Windows 10", 1520, "Microsoft", "Uma merda que só trava", 3, 'https://simplifica.efacil.com.br/wp-content/uploads/2015/07/windows10-scaled.jpg'),
  CriarDado("CorelDrawl", 580, "Adobe", "Uma coisa espetacular", 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBENiO0S1K1EbHlA1zpR0HadjV6TlorTD7A_ASGQ6vSDIt-2cOlVqCW9UdZW0W4_PqN8k&usqp=CAU'),
  CriarDado("Steam", "Grátis", "Steam", "jogos,ihul", 5, 'https://files.tecnoblog.net/wp-content/uploads/2018/12/steam-logo.jpg'),
  // CriarDado("Windows 10", 1594, "Microsoft", "Uma merda que só trava",5),
  // CriarDado("Adobe Photoshop", 1237, "Adobe", "Uma coisa espetacular",4),
  // CriarDado("Aster", 165, "ASTER", "Uma merda",4),


];

function CriarDado(name, price, developer, descrition, rating, image) {
  return { name, price, developer, descrition, rating, image };
}

export default dados;
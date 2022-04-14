import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


// <script type="text/javascript">
//         $(document).ready(
//             function(){
//                 $('#Container img').click(
//                     function( event ){
//                         var scale = 150/100;
//                         var pos = $(this).offset();
//                         var clickX = event.pageX - pos.left;
//                         var clickY = event.pageY - pos.top;
//                         var container = $(this).parent().get(0);

//                         $(this).css({
//                                         width: this.width*scale, 
//                                         height: this.height*scale
//                                     });

//                         container.scrollLeft = ($(container).width() / -2 ) + clickX * scale;
//                         container.scrollTop = ($(container).height() / -2 ) + clickY * scale;
//                     }

//                 );
//             }
//         );
// </script>

export default function StandardImageList() {
    return (
        <ImageList sx={{ width: 630, height: 410 }} cols={3} rowHeight={190}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <a href={item.img} title="Clique aqui para ampliar">
                        <img width="195px" height="195px"
                            src={item.img}
                            alt={item.title}
                        />
                    </a>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {

        img: 'https://files.tecnoblog.net/wp-content/uploads/2019/10/novo-visual-steam-biblioteca.png',
        title: 'Steam',

    },
    {
        img: 'https://t.ctcdn.com.br/y6_zuS5r9yauXYviMeiuUVZQLXk=/79x44:1490x838/512x288/smart/i391689.png',
        title: 'Steam',
    },
    {
        img: 'https://s.zst.com.br/cms-assets/2021/03/steam2-1.jpg',
        title: 'Steam',
    },
    {
        img: 'https://news-cdn.softpedia.com/images/news2/Steam-Client-Gets-Updated-With-New-Big-Picture-Oriented-Bug-Fixes-2.jpg',
        title: 'Steam',
    },
    {
        img: 'https://cdn.vox-cdn.com/thumbor/R2EnA3qPzdwUk__TOV8jX5RBrtc=/0x0:1080x720/1200x800/filters:focal(0x0:1080x720)/cdn.vox-cdn.com/uploads/chorus_image/image/15028965/steam_big_picture_1080.0.jpg',
        title: 'Steam',
    },
    {
        img: 'https://www.funzen.net/po/wp-content/uploads/2020/01/1579122006_346_Como-mover-jogos-do-Steam-para-outro-disco-rigido.jpg',
        title: 'Steam',
    }

];
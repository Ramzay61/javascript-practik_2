let price=null

/*
//-------------- Модальное окно ----------  
//****   работает отдельно от карточек ******

const price=new Modal();      // Создаем окно
//price.onOpen=()=>alert(111)  // если нужно

// экземпляр.open(options) 
// по умолчанию   options:{btnOkVisible:true,  btnCloseVisible:true,  title:'',  body:''} 
price.open();

price.title='Заголовок'
price.body='Привет <br> Привет'

price.beforeClose=(action)=>{
    if(action=='OK')
        return confirm('Вы действительно хотите закрыть окно') 
    return true
}
*/

if(price==null) {    // или модалка или карточки

    //------------- Карточки ------------------
    const fruts=[
        {id:1,title: 'Яблоки',   price:20, img:'https://s1.1zoom.me/b5050/593/Apples_Closeup_Red_Three_490685_1280x1024.jpg'},
        {id:2,title: 'Груши',    price:35, img:'https://cdn1.ozone.ru/s3/multimedia-9/6007131213.jpg'},
        {id:3,title: 'Абрикосы', price:15, img:'https://ekb.zenmod.ru/image/cache/catalog/Liquid/Aroma/Capella/capella_re3_apricot-800x800.jpg?1549617497'},
        {id:4,title: 'Вишни',    price:25, img:'https://www.laboratuvar.com/images/Karoten-Tayini-HPLC.jpg'},
        {id:5,title: 'Сливы',    price:27, img:'https://www.misterproduce.com/wp-content/uploads/2018/10/PLUMS.jpg'},
        {id:6,title: 'Виноград', price:38, img:'https://avatanplus.com/files/resources/original/584533a88c057158ce51ca7e.png'},
        {id:7,title: 'Черешня',  price:24, img:'https://nsk.vipvaper.ru/image/cache/data/468556-vishnya-800x800.jpg'},
        {id:8,title: 'Картошка', price:12, img:'https://tsx211.ru/images/product_images/popup_images/26_0.jpg'},
        {id:9,title: 'Помидоры', price:22, img:'https://avatars.mds.yandex.net/get-zen_doc/1878668/pub_5d35562ba1b4f100ad6d6162_5d35585695aa9f00b111d995/scale_1200'},
        {id:10,title:'Огурцы',   price:18, img:'https://2sotki.ru/wp-content/uploads/0/6/8/06899caf44dd41a5ff6c1e3b26282735.png'}
    ]
    // ---- Функция, которая выполниться при нажатии "Цена" -----
    function priceWindFunc(cardNo){
        const wndPrice=new Modal();      // Создаем окно
        wndPrice.open({                  // Открываем окно
            title:'Просмотр цены',  
            body:`<span>Цена на ${fruts[cardNo].title} установлена ${fruts[cardNo].price} рублей</span>`
        });
        wndPrice.beforeClose=(action)=>{ // Событие перед зарытием окна
            if(action=='OK'){
                if(confirm(`\n\nВы действительно любите фрукт ${fruts[cardNo].title}?`)) {
                    alert('\n\nЯ тоже!')
                    return true
                }
                return true
            }
            alert('\n\nПосмотрите еще раз, может быть цена вам понравится...')
            return false
        }
                                      // окно уничтожается по закрытию
    }

    // ---- Функция, которая выполниться при нажатии "Удалить" -----
    function deleteWindFunc(cardNo){
        const delWind=new Modal();      // Создаем окно
        delWind.open({                  // Открываем окно
            title:'Подтверждение удаления',  
            body:`<span>Вы действительно хотите удалить фрукт ${fruts[cardNo].title} за ${fruts[cardNo].price} рублей</span>`
        });
        delWind.onClose=(action)=>{    // Удаляем карточку
            if(action=='OK'){
                cards.deleteFruct(cardNo)
            }
        }
                                      // окно уничтожается по закрытию
    }

    // ---- Все поготовлено, отображаем карточки -----
    let cards=new Cards(fruts)
    cards.showAll(priceWindFunc)

}
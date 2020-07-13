
  /* Карточки
   */
  class Cards {
    constructor(fruts){
        this.fruts=fruts;
    }
    /* возвращает текст одной карточкиу массива с индексом idx 
     */
    getCard(idx) {
        return `
            <div class="card" style="width: 18rem;">
                <img src="${this.fruts[idx].img}" class="card-img-top" alt="${this.fruts[idx].title}" style="width:285px; height:250px">
                <div class="card-body">
                  <h5 class="card-title">${this.fruts[idx].title}</h5>
                  <a href="void:0" id="btnPrice${idx}" class="btn btn-primary" data-no=${idx}>Цена</a>
                  <a href="void:0" id="btnDelete${idx}" class="btn btn-danger">Удалить</a>
                </div>
            </div>`
    }

    /* Отображает все карточки 
    */
    showAll(){
        // ----------- В цикле создаем текст  ---------------
        let row=`<div id='fruts' style="padding:30px;"> <center>    <div class='row'>`
        for(let i=0; i<this.fruts.length; i++) {
            row+=`<div id="colFrut${i}" class='col' style="margin:15px;">${this.getCard(i)}</div>`
        }
        row+=`</div> <center> </div>`
        // -------- отображаем все карточки сразу -----------
        document.getElementById('cards').innerHTML = row
        
        // --- В цикле определяем onclick для btnPrice  ---------------
        for(let i=0; i<this.fruts.length; i++) {
            eval(`btnPrice${i}.onclick =()=>priceWindFunc(${i})`)
            eval(`btnDelete${i}.onclick=()=>deleteWindFunc(${i})`)
        }
    }  
    /* Удаляет карточку с номером cardNo
    */
    deleteFruct(cardNo) {
        document.getElementById(`colFrut${cardNo}`).remove()
    }
}

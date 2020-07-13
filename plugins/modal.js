/*
new Modal() - создает (но не отображает) модальное окно
open() - открывает (отображает) модальное окно
close() - закрывает (скрывает) модальное окно и удаляет его
destroy() - удаляет модальное окно 
*/
class Modal {
    constructor(){
        this.modal=document.createElement('div')
        this.modal.classList.add('vmodal')
        this.modal.insertAdjacentHTML("afterbegin",  // разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию
        `<div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span id="spanTitle" class="modal-title">Заголовок окна</span>
                    <span id="btnTimes" class="modal-close">&times;</span>
                </div>
                <div id="divBody" class="modal-body">
                </div>
                <div class="modal-footer">
                    <button id="btnOk"   >Ok</button>
                    <button id="btnClose">Отмена</button>
                </div>
            </div>
        </div>
        `)
        document.body.appendChild(this.modal)
    }
    open(options){
        this.window=this
        // ----------- Значения по умолчанию ------------------
        this.btnOkVisible=true
        this.btnCloseVisible=true
        this.title=''
        this.body=''

        if(options) {     // если какие-то опции есть
            if(options.btnOkVisible!=null) {    // Видимость Ok 
                 if(options.btnOkVisible) this.btnOkVisible=true
                 else                     this.btnOkVisible=false
            }
            if(options.btnCloseVisible!=null) {    // Видимость Close
                if(options.btnCloseVisible) this.btnCloseVisible=true
                else                        this.btnCloseVisible=false
           }
            // Заголовок и тело окна
            if(options.title!=null)          this.title=options.title
            if(options.body !=null)          this.body=options.body
        }
        
        // ----------- Нажатие на элементы окна --------------
        this.btnOk_OnClick=   ()=>this.close('OK')     // Обработка нажатия на кнопку Ок
        this.btnClose_OnClick=()=>this.close('CANCEL') // Обработка нажатия на кнопку Отмена
        this.btnTimes_OnClick=()=>this.close('CANCEL') // Обработка нажатия на крестик
        
        // --------------- Открытие окна ----------------------
        this.modal.classList.add('open') // В список классов эл-та div class="vmodal" добавляем класс "open" 

        // ---------- Обработка события onOpen  ---------------
        if(this.onOpen) this.onOpen()
    }
    close(action){

        // --- Обработка события beforeClose. Функция обработчик--
        // --- должна вернуть true/false - закрывать/незакр.  ----
        if(this.beforeClose){
                if(!this.beforeClose(action))
                    return // не закрываем окно, если this.beforeClose(action) вернула false
        }

        // ---------- Обработка события onClose  ---------------
        if(this.onClose) this.onClose(action)

        // ------------- Закрываем и удаляем окно -------------
        this.modal.classList.remove('open') // Из списка классов эл-та div class="vmodal" добавляем класс "open" 
        this.modal.remove()
        this.modal=null
    }
    destroy(){
        this.modal.remove()
        this.modal=null
    }

    // -------------- Свойства ------------------------
    get btnOkVisible()          { if(document.getElementById('btnOk').style.visibility=='visible') return true; return false  }
    set btnOkVisible(value)     { if(value) document.getElementById('btnOk').style.visibility='visible'
                                  else      document.getElementById('btnOk').style.visibility='hidden'
                                }
    get btnCloseVisible()       { if(document.getElementById('btnClose').style.visibility=='visible') return true; return false  }
    set btnCloseVisible(value)  { if(value) document.getElementById('btnClose').style.visibility='visible'
                                  else      document.getElementById('btnClose').style.visibility='hidden'
                                }
    get title()                 { return document.getElementById('spanTitle').textContent }
    set title(value)            { document.getElementById('spanTitle').textContent=value  }
    get body()                  { return document.getElementById('divBody').innerHTML     }
    set body(value)             { document.getElementById('divBody').innerHTML=value      }

    get btnOk_OnClick()         { return document.getElementById('btnOk').onclick }
    set btnOk_OnClick(value)    { document.getElementById('btnOk').onclick=value  }
    get btnClose_OnClick()      { return document.getElementById('btnClose').onclick }
    set btnClose_OnClick(value) { document.getElementById('btnClose').onclick=value  }
    get btnTimes_OnClick()      { return document.getElementById('btnTimes').onclick }
    set btnTimes_OnClick(value) { document.getElementById('btnTimes').onclick=value  }

    // -------- определение событий класса ------------
    onOpen=null;
    beforeClose=null // Функция обработчик должна вернуть true/false - закрывать/незакр.
    onClose=null
}
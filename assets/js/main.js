// @ts-check
/// <reference path="../../typings/animejs.d.ts"/>

class App {
  constructor() {
    this.elements = {
      loading: document.querySelector('body >.loading-container'),
      sections: {
        welcome: document.getElementById('welcome'),
        skills: document.getElementById('skills'),
        projects: document.getElementById('projects'),
        aboutMe: document.getElementById('about-me'),
        contactMe: document.getElementById('contact-me'),
      },
    }
    this.animations = {
      /**
       * @type {anime.AnimeInstance}
       */
      loading: null,
      welcome: {
        /**
         * @type {anime.AnimeInstance}
         */
        name: null,
        /**
         * @type {anime.AnimeInstance}
         */
        profession: null,
      },
    }

    this.loading('show')
  }

  initialize() {
    document.querySelectorAll('body > .hidden').forEach(element => {
      element.classList.remove('hidden')
    })
   this._initializewelcome()
  }
  _initializewelcome(){
      const name = this.elements.sections.welcome.querySelector("h1");
      const userName = name.innerText;
      name.innerHTML = ''
      userName.split('').forEach(letter =>{
          const span = document.createElement('span')
          span.innerText = letter
          name.append(span)
      })
      this.animations.welcome.name = anime.timeline({

      })
  }


  /**
   *
   * @param {'show' | 'hide'} action
   * @returns
   */
  loading(action = 'show') {
    if (action === 'hide') {
      //removemos a classe para nao ocultar o elemento
      this.elements.loading.classList.remove('active')
      this.animations.loading.pause()
      //pausa a aniamção para não cgicar processando enquanto estiver oculta.
      return
    }
    // ser for diferente de null significa que ja criamos a animção
    // então somente mandamos ela reiniciar
    if (this.animations.loading !== null) {
      this.animations.loading.restart()
    } else {
      this.animations.loading = anime({
        targets: '.loading-wrapper > span',
        delay: (_, i) => i * 50,
        loop: true,
        duraction: 600,
        keyframes: [
          { color: 'rgba(255, 255, 255, 0)', scale: 1 },
          { color: 'rgba(255, 255, 255, 1)', scale: 1.5 },
        ],
      })
    }
    this.elements.loading.classList.add('active')
  }
}

const app = new App()

window.onload = function () {
  setTimeout(() => {
    app.loading('hide')
    app.initialize()
  }, 1000)
}

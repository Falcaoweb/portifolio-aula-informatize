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
         * @type{anime.AnimeInstance}
         */
        profession: null,
      },
      /**
       * @type{Array<anime.AnimeInstance>}
       */
      skills: [],
      /**
       * @type{Array<anime.AnimeInstance>}
       */
      projects: [],
      /**
       * @type{Array<anime.AnimeInstance>}
       */
      aboutMe: [],
    }

    this.loading('show')
  }

  initialize() {
    document.querySelectorAll('body > .hidden').forEach(element => {
      element.classList.remove('hidden')
    })
    this._initializewelcome()
    this._intializeskills()
    this._initializeprojects()
    this._initializeAboutMe()
  }

  async _initializewelcome() {
    const parseTextTospans = tag => {
      const element = this.elements.sections.welcome.querySelector(tag)
      const elementValue = element.innerText
      element.innerHTML = ''

      const spans = elementValue.split('').map(letter => {
        const span = document.createElement('span')
        span.innerHTML = !!letter.trim() ? letter : '&nbsp;'
        span.style = 'opacity: 0;'
        return span
      })
      element.append(...spans)
      return spans
    }
    const h1 = parseTextTospans('h1')
    const h3 = parseTextTospans('h3')

    this.animations.welcome.name = anime({
      targets: h1,
      duration: 180,
      easing: 'linear',
      delay: (_, i) => i * 30,
      keyframes: [{ opacity: 1 }],
    })

    await this.animations.welcome.name.finished

    this.animations.welcome.profession = anime({
      targets: h3,
      duration: 180,
      easing: 'linear',
      delay: (_, i) => i * 60,
      keyframes: [{ opacity: 1 }],
    })
  }

  _intializeskills() {
    const skills = this.elements.sections.skills.querySelectorAll('.skill-item')
    skills.forEach(element => {
      element.style.transform = 'scale(0)'
      element.querySelectorAll('.skill-content-bars > span').forEach(span => {
        span.style.transform = 'scale(0)'
        span.style.opacity = '0'
      })
    })

    const scrollEvent = async event => {
      if (this.animations.skills.length > 0) {
        window.removeEventListener('scroll', scrollEvent)
        return
      }

      const sectionSkill = this.elements.sections.skills
      const { top, height } = sectionSkill.getBoundingClientRect()
      if (top > height / 3) {
        const animation = anime({
          targets: skills,
          duration: 300,
          delay: (__, i) => 300 + i * 60,
          easing: 'easeInOutBounce',
          keyframes: [{ scale: 1 }],
        })
        this.animations.skills.push(animation)
        await animation.finished

        skills.forEach(skill => {
          this.animations.skills.push(
            anime({
              targets: skill.querySelectorAll('.skill-content-bars > span'),
              duration: 189,
              delay: (__, i) => i * 30,
              easing: 'easeInOutBounce',
              keyframes: [{ scale: 1, opacity: 1 }],
            })
          )
        })
      }
    }
    window.addEventListener('scroll', scrollEvent)
  }
  _initializeprojects() {
    /**
     * @type {NodeListOf<HTMLElement>}
     */
    const projects = this.elements.sections.projects.querySelectorAll('a')
    projects.forEach(projects => {
      projects.style.transform = 'translateY(240px)'
      projects.style.opacity = '0'
      projects.style.display = 'block'
    })

    const scrollEvent = async () => {
      if (this.animations.projects.length > 0) {
        window.removeEventListener('scroll', scrollEvent)
        return
      }
      const { top, height } =
        this.elements.sections.projects.getBoundingClientRect()
      if (top < height / 2) {
        this.animations.projects.push(
          anime({
            targets: projects,
            duration: 1000,
            delay: (__, i) => i * 60,
            easing: 'easeInOutBounce',
            keyframes: [
              {
                translateY: 0,
                opacity: 1,
              },
            ],
          })
        )
      }
    }

    window.addEventListener('scroll', scrollEvent)
  }

  _initializeAboutMe() {
    this.elements.sections.aboutMe.style.transform = 'scale(1, 0)'
    Array.from(this.elements.sections.aboutMe.children).forEach(element => {
      element.style.opacity = '0'
    })
    const scrollEvent = async () => {
      if (this.animations.aboutMe.length > 0) {
        window.removeEventListener('scroll', scrollEvent)
        return
      }

      const { top } = this.elements.sections.aboutMe.getBoundingClientRect()
      if (top < 800) {
        debugger
        const animation = anime({
          targets: this.elements.sections.aboutMe,
          duration: 1000,
          delay: 500,
          keyframes: [{ scale: 1 }],
        })

        this.animations.aboutMe.push(animation)

        await animation.finished

        this.animations.aboutMe.push(
          anime({
            targets: this.elements.sections.aboutMe.children,
            duration: 300,
            delay: (__, i) => 300 * i,
            keyframes: [
              {
                opacity: 1,
              },
            ],
          })
        )
      }
    }

    window.addEventListener('scroll', scrollEvent)
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
      //pausa a aniamção para não ficar processando enquanto estiver oculta.
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

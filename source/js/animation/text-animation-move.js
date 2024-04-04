export default () => {
  const CLASS_CONTAINER = `text__word`;
  const TEXT_LENGTH = 4;
  const TIME_STEP = 80;

  class AnimationTypographyMove {
    constructor({
      elementSelector,
      timer = 500,
      classActivate = `text-animation-move`,
      property = `transform`,
    }) {
      this._timeOffset = 0;
      this._elementSelector = elementSelector;
      this._classActivate = classActivate;
      this._timer = timer;
      this._property = property;
      this._element = document.querySelector(this._elementSelector);
      this.wrapperText();
    }

    createElement(text, currentIndex) {
      const span = document.createElement(`span`);

      span.textContent = text;
      span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;

      if (currentIndex % TEXT_LENGTH < TEXT_LENGTH / 2) {
        this._timeOffset -= TIME_STEP;
      } else {
        this._timeOffset += TIME_STEP;
      }

      return span;
    }

    wrapperText() {
      if (!this._element) {
        return;
      }
      const text = this._element.textContent.trim().split(` `).filter((item) => item !== '');

      const content = text.reduce((fragmentParent, word) => {
        const element = Array.from(word).reduce((fragment, item, currentIndex) => {
          fragment.appendChild(this.createElement(item, currentIndex));
          return fragment;
        }, document.createDocumentFragment());

        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(CLASS_CONTAINER);
        wordContainer.appendChild(element);

        fragmentParent.appendChild(wordContainer);

        return fragmentParent;
      }, document.createDocumentFragment());

      this._element.innerHTML = ``;
      this._element.appendChild(content);
    }

    addAnimation() {
      if (!this._element) {
        return;
      }
      this._element.classList.add(this._classActivate);
    }

    removeAnimation() {
      this._element.classList.remove(this._classActivate);
    }
  }

  const introTitleAnimation = new AnimationTypographyMove({elementSelector: `.intro__title`});
  const introDateAnimation = new AnimationTypographyMove({elementSelector: `.intro__date`});
  const prizesTitleAnimation = new AnimationTypographyMove({elementSelector: `.prizes__title`});
  const gameTitleAnimation = new AnimationTypographyMove({elementSelector: `.game__title`});
  const sliderTitleAnimation = new AnimationTypographyMove({elementSelector: `.slider__item-title`});
  const rulesTitleAnimation = new AnimationTypographyMove({elementSelector: `.rules__title`});

  document.body.addEventListener(`screenChanged`, (e) => {
    introTitleAnimation.removeAnimation();
    introDateAnimation.removeAnimation();
    sliderTitleAnimation.removeAnimation();
    prizesTitleAnimation.removeAnimation();
    rulesTitleAnimation.removeAnimation();
    gameTitleAnimation.removeAnimation();

    switch (e.detail.screenName) {
      case `top`:
        setTimeout(() => introTitleAnimation.addAnimation(), 500);
        setTimeout(() => introDateAnimation.addAnimation(), 800);
        break;
      case `rules`:
        setTimeout(() => rulesTitleAnimation.addAnimation(), 500);
        break;
      case `story`:
        setTimeout(() => sliderTitleAnimation.addAnimation(), 500);
        break;
      case `prizes`:
        setTimeout(() => prizesTitleAnimation.addAnimation(), 500);
        break;
      case `game`:
        setTimeout(() => gameTitleAnimation.addAnimation(), 500);
        break;
    }
  });
};

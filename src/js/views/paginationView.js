import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // generateMarkup method
  // N/B
  // every view that renders something to the dom needs a generate markup method
  _generateMarkup() {
    const curPage = this._data.page;
    // we need to know how many pages there are for each search results.
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
       <button class="btn--inline pagination__btn--next" data-goto="${curPage +
         1}">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>`;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${curPage -
          1}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>`;
    }
    // other pages
    if (curPage < numPages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${curPage -
        1}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next" data-goto="${curPage +
        1}">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // page 1 and there are no other pages
    return '';

    // return `<button class="btn--inline pagination__btn--prev">
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-left"></use>
    //   </svg>
    //   <span>Page 1</span>
    // </button>
    // <button class="btn--inline pagination__btn--next">
    //   <span>Page 3</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button>`;
  }

  addHandlerPages(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      // const page = +btn
      //   .querySelector('span')
      //   .textContent.split(' ')
      //   .pop();
      handler(gotoPage);
      // console.log(page);
    });
  }
}

export default new PaginationView();

import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      console.log(e.target);
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, and are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev');
    }

    // Other pages
    if (curPage < numPages) {
      return (
        this._generateButtonMarkup('prev') + this._generateButtonMarkup('next')
      );
    }

    // Page 1, and no other pages
    return '';
  }

  _generateButtonMarkup(nav) {
    const currentPage = this._data.page;
    return nav === 'prev'
      ? `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `
      : `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();

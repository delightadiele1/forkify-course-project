import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your search item! Please try again:)';

  _generateMarkup() {
    //return this._data.map(this._generateMarkupPreview).join();
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

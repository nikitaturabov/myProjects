function getKeys(obj) {
  let res = [];

  const iter = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'boolean' && obj[key]) {
        res.push(key);
      } else if (typeof obj[key] === 'object') {
        iter(obj[key]);
      }
    })
  }

  iter(obj);

  return res;
}

export function setStateText(text) {
  state.text = text;
}

export function setStateFiles(files) {

  state.base64 = {};
  state.files = '';

  if (files.length === 0) {
    return;
  }

  let arr = [];

  for (let i = 0; i < files.length; i++) {
    state.base64[files[i].id] = files[i].base64;
    arr.push({ id: files[i].id, name: files[i].name, size: files[i].size })
  }

  state.files = JSON.stringify(arr);
}

export function setStateQuotes(quotes) {
  if (quotes.length === 0) {
    return;
  }

  state.quotes = JSON.stringify(quotes.map(quote => quote.id));
}

export function setStatePickedMessages(messages) {
  if (messages.length === 0) {
    return;
  }

  state.pickedMessages = JSON.stringify(messages);
}

export function setStateInnerMessage(b) {
  state.isInnerMessage = b;
}

export function setSearchStr(str) {
  searchStr = str;
}

export function setFilters(arr) {
  if (arr === null || arr.length === 0) {
    filters = '';

    return;
  }

  filters = getKeys(arr).join(', ');

}
export function setFeedback(id, comment) {
  if (id === '' || comment === '') {
    return;
  }

  feedback.id = id;
  feedback.text = comment;
}

export function setIdEditedMessage(id) {
  idEditedMessage = id;
}

export function clearGlobalState() {
  searchStr = '';
  filters = '';
  feedback = {};
  idEditedMessage = null;

  state = {
    text: '',
    files: '',
    base64: {},
    quotes: '',
    pickedMessages: '',
    isInnerMessage: false,
  };
}


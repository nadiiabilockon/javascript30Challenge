const siteName = document.getElementById('siteName');
const siteUrl = document.getElementById('siteUrl');
const bookmarksResults = document.getElementById('bookmarksResults');
const form = document.getElementById('myForm');

function saveBookmark(e) {
  e.preventDefault();

  if (!validation(siteName.value, siteUrl.value)) {
    return false
  }

  const bookmark = {
    name: siteName.value,
    url: siteUrl.value
  }

  if (!localStorage.getItem('bookmarks')) {
    const bookmarks = [];
    setStorage(bookmarks, bookmark);
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    setStorage(bookmarks, bookmark);
  }

  form.reset()

  fetchBookmarks()
}

function setStorage(arr, item) {
  arr.push(item);
  localStorage.setItem('bookmarks', JSON.stringify(arr))
}

function deleteBookmark(url) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  const restBookmarks = bookmarks.filter(bookmark => bookmark.url != url);

  localStorage.setItem('bookmarks', JSON.stringify(restBookmarks))
  fetchBookmarks()
}

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  bookmarksResults.innerHTML = '';

  bookmarks.forEach(bookmark => {
    const { name, url } = bookmark;

    bookmarksResults.innerHTML += `<div class="well">
                                  <h3> ${name}
                                  <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
                                  <a onclick="deleteBookmark(\'${url}'\)" class="btn btn-danger" href="#">Delete</a>
                                  </h3>
                                  </div>`
  })
}

function validation(siteName, siteUrl) {

  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false
  }

  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use valid URL');
    return false
  }

  return true
}

document.getElementById('myForm').addEventListener('submit', saveBookmark);

import axios from 'axios';

export default {
  getSavedBooks: function() {
    return axios.get('/api/books')
  },
  getBookById: function(bookId) {
    return axios.get(`/api/books/${bookId}`)
  },
  saveBook: function(bookData) {
    return axios.post('/api/books', bookData)
  },
  updateBook: function(bookId, bookData) {
    return axios.put(`/api/books/${bookId}`, bookData)
  },
  deleteBook: function(bookId) {
    return axios.delete(`/api/books/${bookId}`)
  },
  searchGoogleBooks: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes", { params: { q: query}})
  }
};
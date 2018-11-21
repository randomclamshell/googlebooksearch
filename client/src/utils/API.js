//ONCE THE BACKEND IS MADE AND YOU HAVE CD'ED INTO THE CLIENT FOLDER AND DID A YARN INSTALL, THIS IS STEP 7. THIS IS JUST TO SET UP THE FUNCTIONALITY FOR THE ROUTES SO THEY WILL WORK

import axios from 'axios';

export default {
  
  //THIS IS TO GET ALL THE BOOKS SAVED. SINCE WE WANT TO GET ALL OF THEM, WE LEFT THE () EMPTY. IF WE NEEDED TO SEARCH BY SOMETHING SPECIFIC, WE WOULD PUT IN THE ARGUEMENT 
  getSavedBooks: function() {
    return axios.get('/api/books')
  },
  
  //THIS IS TO SEARCH FOR A BOOK USING AN ID
  getBookById: function(bookId) {
    return axios.get(`/api/books/${bookId}`)
  },
  //THIS FUNCTION SAVES THE BOOK. BOOKDATA IS A NEW BOOK
  saveBook: function(bookData) {
    return axios.post('/api/books', bookData)
  },

  //UPDATE THE BOOK, BOOKID IS WHICH ONE WE WANT TO UPDATE, AND BOOKDATA IS WHAT WE WANT TO UPDATE
  updateBook: function(bookId, bookData) {
    return axios.put(`/api/books/${bookId}`, bookData)
  },
  
  //THIS IS GOING TO FIND THE BOOK WE WANT BY ID AND REMOVING IT
  deleteBook: function(bookId) {
    return axios.delete(`/api/books/${bookId}`)
  },
  searchGoogleBooks: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes", { params: { q: query } })
    //ABOVE IS READ AS AXIOS.GET(URL, OPTIONS). { params: { q: query } } MEANS THAT WE ARE USING QUERY TO SEARCH
  }
};
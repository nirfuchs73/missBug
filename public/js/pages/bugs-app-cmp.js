import bugService from '../services/bug-service.js';
// import bookList from '../cmps/book-list-cmp.js';
// import bookDetails from '../cmps/book-details-cmp.js'
// import bookFilter from '../cmps/book-filter-cmp.js';
// import bookAdd from '../pages/book-add-cmp.js';

export default {
    template: `
        <section class="bugs-app">
            <h1>Bugs App</h1>
            <!-- <book-add></book-add>
            <book-filter v-on:filtered="setFilter"></book-filter>
            <book-list v-bind:books="booksToShow"></book-list>
            <book-details v-bind:book="selectedBook"></book-details> -->
        </section> 
    `,
    data() {
        return {
            bugs: [],
            // // selectedBook: null,
            // // filter: null,
            // filterBy: {
            //     title: '',
            //     fromPrice: 0,
            //     toPrice: Infinity
            // }
        }
    },
    created() {
        bugService.getBugs()
            .then(bugs => {
                console.log('getBugs');
                console.log(bugs);
                this.bugs = bugs;
            });
        // bookService.getBooks()
        //     .then(books => this.books = books);
    },
    methods: {
        // setFilter(filterBy) {
        //     console.log('BoookApp Got Filter: ', filterBy);
        //     this.filterBy = filterBy;
        // },
        // selectBook(bookId) {
        //     console.log(bookId);
        //     bookService.getBookById(bookId)
        //         .then(book => this.selectedBook = book);
        // },
    },
    computed: {
        // booksToShow() {
        //     if (!this.filterBy.title &&
        //         this.filterBy.fromPrice === 0 &&
        //         this.filterBy.toPrice === Infinity) return this.books;
        //     return this.books.filter(book => {
        //         return book.title.includes(this.filterBy.title) &&
        //             book.listPrice.amount > this.filterBy.fromPrice &&
        //             book.listPrice.amount < this.filterBy.toPrice
        //     })
        // },

    },
    components: {
        // bookList,
        // bookDetails,
        // bookFilter,
        // bookAdd
    }
}
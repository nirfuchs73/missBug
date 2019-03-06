import bugService from '../services/bug-service.js';
// import bookList from '../cmps/book-list-cmp.js';
// import bookDetails from '../cmps/book-details-cmp.js'
// import bookFilter from '../cmps/book-filter-cmp.js';
// import bookAdd from '../pages/book-add-cmp.js';

export default {
    template: `
        <section class="bugs-app">
            <h1>Bugs App</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Creator</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody  v-for="(currBug, idx) in bugs" :key="currBug._id">
                    <tr>
                        <td>{{currBug.title}}</td>
                        <td>{{currBug.description}}</td>
                        <td>{{currBug.severity}}</td>
                        <td>{{currBug.creator.name}}</td>
                        <td><button v-on:click="onDeleteClicked(currBug._id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>

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
        onDeleteClicked(bugId) {
            bugService.deleteBug(bugId)
                .then(res => {
                    // console.log(res);
                    bugService.getBugs()
                        .then(bugs => {
                            this.bugs = bugs;
                        });
                });
        }
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
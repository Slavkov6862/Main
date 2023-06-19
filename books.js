function Books(name, genres, pages, issued){
    
        Books.calculatePeriod = function (date) {
            var timeissued = new Date(date).getTime();
            var now = Date.now();
            var timeDiff = now - timeissued;

            var periodInYears = (timeDiff / 1000 / 60 / 60 / 24 / 365).toFixed(2);

            return periodInYears;
        };

        Books.validate = function (val, fieldId, criteriaCallback) {
            try {
                criteriaCallback(val);
            } catch (error) {
                document.querySelector(`${fieldId} + span.error`).style.setProperty('display', 'inline-block');
                document.querySelector(`${fieldId} + span.error`).innerHTML = error.message;
                throw new Error('');
            }
            return val;
        };

        this.name = Books.validate(name, '#name', function (val) {
            if (val.length < 2) {
                throw new Error('Books Name must be 3 or more characters long.');
            }
        });
        this.genres = Books.validate(genres, '#genres', function (val) {
            if (val.length < 1) {
                throw new Error(' Genres Name must be 3 or more characters long.');
            }
        });
        this.pages = Books.validate(pages, '#pages', function (val) {
            if (pages < 1 || pages > 1000) {
                throw new Error('Pages must be between 50 and 1000.');
            }
        });

        this.issued = Books.validate(issued, '#issued', function (date) {
            var testDate = new Date(date).getTime();
            var now = Date.now();

            if (!date) {
                throw new Error('Please, Enter Issued Date!');
            }

            if (testDate > now) {
                throw new Error('Issued Date cannot be in the future!');
            }
        });

        this.issued = Books.calculatePeriod(this.issued);

        this.printTableRow = function () {
            var tr = document.createElement('tr');
            tr.innerHTML = `<td>${this.name}</td><td>${this.genres}</td><td>${this.pages}</td><td>${this.issued}</td>`;

            return tr;
    }
};

Books.collection = [
    new Books('Pod Igoto', 'Roman', '345', '2014-01-15'),
    new Books('Na Brazdata', 'Razkaz', '54', '2018-01-15'),
    new Books('Septemvri', 'Stihotvorenie', '2', '2020-01-15'),
];

Books.printTableHeader = function () {
    var tr = document.createElement( 'tr' );
    tr.innerHTML = `<th class="sort name">Name</th><th class="sort genres">Genres</th><th class="sort pages">Pages</th><th class="sort issued">Issued</th>`;

    return tr;
}

Books.printTableRows = function () {
    document.querySelector('#details').appendChild( Books.printTableHeader() );
    Books.collection.forEach(function (books) {
        document.querySelector('#details').appendChild( books.printTableRow() );
    });

    Books.sortColumn();
}

Books.sortColumn = function() {
    function removeOldData () {
        Array.from(document.querySelectorAll('#details td')).forEach(function(td) {
            td.parentElement.remove();
        });

        Array.from(document.querySelectorAll('#details th')).forEach(function(td) {
            td.parentElement.remove();
        });
    }


Array.from(document.querySelectorAll('th.sort')).forEach(function(tableHeader) {
    tableHeader.addEventListener( 'click', function (event) {
        if ( event.currentTarget.classList.value  === "sort name desc") {
            Books.collection = Books.collection.sort(function (a, b) {
                return b.name - a.name;
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.name').classList.remove('desc');
        }

        if ( event.currentTarget.classList.value  === "sort name") {
            Books.collection = Books.collection.sort(function (a, b) {
                return a.name - b.name;
            });

            removeOldData();
            Books.printTableRows();
            event.currentTarget.classList.value = 'sort name';
            document.querySelector('.sort.name').classList.add('desc');;
        }

        if ( event.currentTarget.classList.value  === "sort genres desc") {
            Books.collection = Books.collection.sort(function (a, b) {
                return b.genres - a.genres;
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.genres').classList.remove('desc');;
        }

        if ( event.currentTarget.classList.value  === "sort genres") {
            Books.collection = Books.collection.sort(function (a, b) {
                return a.genres - b.genres;
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.genres').classList.add('desc');;
        }

        if (event.currentTarget.classList.value === "sort pages desc") {
            Books.collection = Books.collection.sort(function (a, b) {
                return b.pages.localeCompare(a.pages);
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.pages').classList.remove('desc');;
        }

        if (event.currentTarget.classList.value === "sort pages") {
            Books.collection = Books.collection.sort(function (a, b) {
                return a.pages.localeCompare(b.pages);
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.pages').classList.add('desc');;
        }

        if (event.currentTarget.classList.value === "sort issued desc") {
            Books.collection = Books.collection.sort(function (a, b) {
                return b.issued.localeCompare(a.issued);
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.issued').classList.remove('desc');;
        }

        if (event.currentTarget.classList.value === "sort issued") {
            Books.collection = Books.collection.sort(function (a, b) {
                return a.issued.localeCompare(b.issued);
            });

            removeOldData();
            Books.printTableRows();
            document.querySelector('.sort.issued').classList.add('desc');;
        }
    } );
});

}
Books.addToCollection = function ( books ) {
    if ( books.constructor.name !== 'Books' ) {
        throw new Error( `Please, Enter correct details for the Books: ${books.name} ${books.genres}` );
    }

    Books.collection.push(books);
}

Books.submitDetails = function () {
    document.querySelector('#submitBooksDetails').addEventListener( 'click', function (event) 
    {
        event.preventDefault();

        Array.from(document.querySelectorAll('span.error')).forEach( function (errField) {
            errField.innerHTML = '';
            errField.style.setProperty('display', 'none');
        } );

        var name = document.querySelector('#name');
        var genres = document.querySelector('#genres');
        var pages = document.querySelector('#pages');
        var issued = document.querySelector('#issued');

        var books = new Books(name.value, genres.value, pages.value, issued.value);

        try {
            Books.addToCollection(books);
            printTable( books );
        } catch ( error ) {
            document.getElementById('error').innerText = error.message;
        }
    } );
}

Books.displayFormGroup = function (button) {
    document.querySelector( button ).addEventListener( 'click', function( event ) {
        Array.from(document.querySelectorAll('.form-group')).forEach( function( element ) {
            element.style.setProperty('display', 'none');
        } );

        Books.renderForm();
        Books.submitDetails();
        Books.printTableRows();
        
        var selectorPart = event.target.id.replace('new', '').toLocaleLowerCase();
        var wholeSelector = `${selectorPart}Details`;
        document.querySelector(`.${wholeSelector}`).style.setProperty('display', 'block');
    } );
}

Books.renderForm = function () {
    var template = `<div id="error"></div>
    <div class="form-group booksDetails">
        <form id="booksDetails">
            <div class="form-name">Enter Books Details</div>
            <label>Name</label>
            <input type="text" id="Name" />
            <span class="error"></span>
            <label>Genres</label>
            <input type="text" id="genres" />
            <span class="error"></span>
            <label>Pages</label>
            <input type="number" id="Pages" />
            <span class="error"></span>
            <label>Issued</label>
            <input type="date" id="Issued" />
            <span class="error"></span>
            <button id="submitBooksDetails">Submit</button>
        </form>
    </div>
    <table id="details"></table>
    </div>`;

    document.querySelector('#content').innerHTML = template;
}
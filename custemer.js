function Custemer ( firstName, lastName, age, baying ) {

    Custemer.calculatePeriod = function (date) {
        var timebaying = new Date(date).getTime();
        var now = Date.now();
        var timeDiff = now - timebaying;

        var periodInYears = ( timeDiff / 1000 / 60 / 60 / 24 / 365 ).toFixed(2);

        return periodInYears;
    };

    Custemer.validate = function (val, fieldId, criteriaCallback) {
        try {
            criteriaCallback(val);
        } catch (error) {
            document.querySelector(`${fieldId} + span.error`).style.setProperty('display', 'inline-block');
            document.querySelector(`${fieldId} + span.error`).innerHTML = error.message;
            throw new Error('');
        }
        return val;
    };

    this.firstName = Custemer.validate(firstName, '#firstName', function (val) {
        if (val.length < 3 ) {
            throw new Error( 'First Name must be 3 or more characters long.' );
        }
    });

    this.lastName = Custemer.validate(lastName, '#lastName', function (val) {
        if (val.length < 4 ) {
            throw new Error( 'Last Name must be 4 or more characters long.' );
        }
    });
    this.age = Custemer.validate(age, '#age', function (val) {
        if (age < 18 || age > 100) {
            throw new Error('Age must be between 18 and 100 years.');
        }
    });

    this.baying = Custemer.validate(baying, '#baying', function (date) {
        var testDate = new Date(date).getTime();
        var now = Date.now();

        if (!date) {
            throw new Error('Please, Enter Custemer Date!');
        }

        if (testDate > now ) {
            throw new Error('Custemer Date cannot be in the future!');
        }
    });

    this.baying = Custemer.calculatePeriod(this.baying);

    this.printTableRow = function () {
        var tr = document.createElement( 'tr' );
        tr.innerHTML = `<td>${this.firstName}</td><td>${this.lastName}</td><td>${this.age}</td><td>${this.baying}</td>`;

        return tr;
    }
};

Custemer.collection = [
    new Custemer('Petar', 'Jordanov', 29, '2014-01-15'),
    new Custemer('Plamen', 'Ignatov', 51, '2018-01-15'),
    new Custemer('Snejana', 'Aleksandrova', 19, '2021-01-15')
];

Custemer.printTableHeader = function () {
    var tr = document.createElement( 'tr' );
    tr.innerHTML = `<th class="sort firstName">First Name</th><th class="sort lastName">Last Name</th><th class="sort age">Age</th><th class="sort baying">Baying</th>`;

    return tr;
}

Custemer.printTableRows = function () {
    document.querySelector('#details').appendChild( Custemer.printTableHeader() );
    Custemer.collection.forEach(function (custemer) {
        document.querySelector('#details').appendChild( custemer.printTableRow() );
    });

    Custemer.sortColumn();
}

Custemer.sortColumn = function () {
    function removeOldData () {
        Array.from(document.querySelectorAll('#details td')).forEach(function (td) {
            td.parentElement.remove();
        });

        Array.from(document.querySelectorAll('#details th')).forEach(function (td) {
            td.parentElement.remove();
        });
    }

    Array.from(document.querySelectorAll('th.sort')).forEach(function(tableHeader) {
        tableHeader.addEventListener( 'click', function (event) {
            if ( event.currentTarget.classList.value  === "sort age desc") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return b.age - a.age;
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.age').classList.remove('desc');
            }

            if ( event.currentTarget.classList.value  === "sort age") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return a.age - b.age;
                });

                removeOldData();
                Custemer.printTableRows();
                event.currentTarget.classList.value = 'sort age';
                document.querySelector('.sort.age').classList.add('desc');;
            }

            if ( event.currentTarget.classList.value  === "sort baying desc") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return b.baying - a.baying;
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.baying').classList.remove('desc');;
            }

            if ( event.currentTarget.classList.value  === "sort baying") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return a.baying - b.baying;
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.baying').classList.add('desc');;
            }

            if (event.currentTarget.classList.value === "sort firstName desc") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return b.firstName.localeCompare(a.firstName);
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.firstName').classList.remove('desc');;
            }

            if (event.currentTarget.classList.value === "sort firstName") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.firstName').classList.add('desc');;
            }

            if (event.currentTarget.classList.value === "sort lastName desc") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return b.lastName.localeCompare(a.lastName);
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.lastName').classList.remove('desc');;
            }

            if (event.currentTarget.classList.value === "sort lastName") {
                Custemer.collection = Custemer.collection.sort(function (a, b) {
                    return a.lastName.localeCompare(b.lastName);
                });

                removeOldData();
                Custemer.printTableRows();
                document.querySelector('.sort.lastName').classList.add('desc');
            }
        } );
    });
}
Custemer.addToCollection = function ( custemer ) {
    if ( custemer.constructor.name !== 'Custemer' ) {
        throw new Error( `Please, Enter correct details for the Custemer: ${custemer.firstName} ${custemer.lastName}` );
    }

    Custemer.collection.push(custemer);
}

Custemer.submitDetails = function () {
    document.querySelector('#submitCustemerDetails').addEventListener( 'click', function (event) {
        event.preventDefault();

        Array.from(document.querySelectorAll('span.error')).forEach( function (errField) {
            errField.innerHTML = '';
            errField.style.setProperty('display', 'none');
        } );

        var firstName = document.querySelector('#firstName');
        var lastName = document.querySelector('#lastName');
        var age = document.querySelector('#age');
        var baying = document.querySelector('#baying');


        var custemer = new Custemer( firstName.value, lastName.value, age.value, baying.value );
        
        try {
            Custemer.addToCollection(custemer);
            printTable( custemer );
        } catch (error) {
            document.getElementById('error').innerText = error.message;
        }
    } );
}

Custemer.displayFormGroup = function (button) {
    document.querySelector( button ).addEventListener( 'click', function( event ) {
        Array.from(document.querySelectorAll('.form-group')).forEach( function( element ) {
            element.style.setProperty('display', 'none');
        } );

        Custemer.renderForm();
        Custemer.printTableRows();
        Custemer.submitDetails();

        var selectorPart = event.target.id.replace('new', '').toLocaleLowerCase();
        var wholeSelector = `${selectorPart}Details`;
        document.querySelector(`.${wholeSelector}`).style.setProperty('display', 'block');
    } );
}

Custemer.renderForm = function () {
   var template = `<div id="error"></div>
    <div class="form-group custemerDetails">
        <form id="custemerDetails">
            <div class="form-name">Enter Custemer Details</div>
            <label>First Name</label>
            <input type="text" id="firstName" />
            <span class="error"></span>
            <label>Last Name</label>
            <input type="text" id="lastName" />
            <span class="error"></span>
            <label>Age</label>
            <input type="number" id="age" />
            <span class="error"></span>
            <label>Addresses Data</label>
            <input type="date" id="addresses" />
            <span class="error"></span>
            <button id="submitCustemerDetails">Submit</button>
        </form>
    </div>
    <table id="details"></table>
    </div>`;

    document.querySelector('#content').innerHTML = template;
}











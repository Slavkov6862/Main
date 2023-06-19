function Customer(firstName, lastName, age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    this.printTableRow = function(){
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${this.firstName}</td><td>${this.lastName}</td><td>${this.age}</td>`;

        return tr;

    }

}

Customer. collection = [];

Customer.addToCollektion = function (customer){
    if(customer.name !== 'Customer'){
        throw new Error (`Please, Enter correct customer: ${customer.firstName} ${customer.lastName}`);
    }
    Customer.collection.push(customer);
}

Customer.displayFormGroup = function(button){
    document.querySelector(li).addEventListener('click', function(event){
        Array.from(document.querySelectorAll('.form-group')).forEach(function(element){
            element.style.setProparty('display', 'none');
        });

        var selectorPart = event.target.id.replace('new', '').toLocaleLowerCase();
        var wholeSelector = `${selectorPart}Details`;
        document.querySelector(`.${wholeSelector}`).style.setProparty('display','block');
    })
}
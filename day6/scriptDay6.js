const textFields = document.querySelectorAll('.mdc-text-field');
textFields.forEach(textField => mdc.textField.MDCTextField.attachTo(textField));

document.getElementById('add-item').addEventListener('click', function() {
    const itemName = document.getElementById('item-name').value;
    const itemCategory = document.getElementById('item-category').value;

    if (itemName && itemCategory) {
        const shoppingList = document.getElementById('shopping-list');

        let categorySection = document.getElementById(`category-${itemCategory}`);
        if (!categorySection) {
            categorySection = document.createElement('div');
            categorySection.id = `category-${itemCategory}`;
            categorySection.className = 'category-section';

            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = itemCategory;
            categorySection.appendChild(categoryHeader);

            shoppingList.appendChild(categorySection);
        }

        const itemDiv = document.createElement('div');
        itemDiv.className = 'shopping-item';

        const itemText = document.createElement('span');
        itemText.textContent = itemName;

        const categoryText = document.createElement('span');
        categoryText.className = 'category';
        categoryText.textContent = `(${itemCategory})`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            itemDiv.remove(); 
            // Se a categoria ficar vazia, remove a seção da categoria
            if (categorySection.children.length === 1) { // 1 porque o cabeçalho ainda está lá
                categorySection.remove();
            }
        });

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(categoryText);
        itemDiv.appendChild(deleteButton);

        categorySection.appendChild(itemDiv);

        document.getElementById('item-name').value = '';
        document.getElementById('item-category').value = '';
    } else {
        alert('Por favor, preencha ambos os campos.');
    }
});
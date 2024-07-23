// Client-side validation for forms
document.addEventListener('DOMContentLoaded', function () {
    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function (event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!name || !email) {
                event.preventDefault();
                alert('Please fill out both the name and email fields.');
            }
        });
    }

    // Handle delete user with modal confirmation
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.dataset.userId;
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            const confirmDeleteButton = document.getElementById('confirm-delete');
            confirmDeleteButton.dataset.userId = userId;
            deleteModal.show();
        });
    });

    // Confirm deletion
    const confirmDeleteButton = document.getElementById('confirm-delete');
    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function () {
            const userId = this.dataset.userId;
            fetch(`/delete/${userId}`, { method: 'POST' })
                .then(response => response.text())
                .then(data => {
                    location.reload();
                });
        });
    }
});

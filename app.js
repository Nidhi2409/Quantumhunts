$(function () {
    const classAList = $('#sortable');
  
    // Function to fetch and display students
    function displayStudents() {
      classAList.empty();
  
      // Fetch students from the server
      $.get('/api/students/Class A', function (students) {
        students.forEach(function (student) {
          classAList.append(`<li class="list-group-item">${student.name_of_student}</li>`);
        });
  
        // Enable sorting
        classAList.sortable({
          update: function (event, ui) {
            // Update the sort rank based on the new order
            const updatedOrder = classAList.find('li').map(function () {
              return $(this).text();
            }).get();
  
            // Send AJAX request to update sort rank
            $.ajax({
              url: '/api/updateSortRank',
              method: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify({
                class: 'Class A',
                updates: updatedOrder.map(function (student, index) {
                  return { name_of_student: student, sort_rank: index + 1 };
                }),
              }),
              success: function () {
                console.log('Sort rank updated successfully');
              },
            });
          },
        });
      });
    }
  
    // Initial display
    displayStudents();
  });
  
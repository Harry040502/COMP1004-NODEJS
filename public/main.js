const deleteBtn = document.querySelectorAll('.deleteButton');
for (const button of deleteBtn) {
    button.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      fetch(`/users`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: e.target.dataset.fname,
          lname: e.target.dataset.lname,
          number: e.target.dataset.number,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then(() => {
          window.location.reload();
        });
    });
  }
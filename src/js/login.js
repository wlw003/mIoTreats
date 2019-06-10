const guideList = document.querySelector('.guides');
const loggedOutlinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin'); 
const productCode = document.querySelector('.pro')
const scheduleTime = document.querySelector('.schedule')
const photo0 = document.querySelector('.photo0')
const photo1 = document.querySelector('.photo1')
const photo2 = document.querySelector('.photo2')
const photo3 = document.querySelector('.photo3')
const photo4 = document.querySelector('.photo4')

const setupUI = (user) => {
  if (user) {
    // if admin
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('devices').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>Product Code: ${doc.data().deviceID}</div>
        <div>${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    })

    db.collection('devices').doc(user.uid).get().then(doc => {
      const html = `
      <div>Your Registed Product: ${doc.data().deviceID}</div>
      `;
      productCode.innerHTML = html; 
    })

    db.collection('deviceTime').doc(user.uid).get().then(doc => {
      const html = `
      <h5 class="lead">Your Scheduled Feeding Time is: ${doc.data().date} at ${doc.data().time}</h5>
      `;
      scheduleTime.innerHTML = html;
    })

// add dates
    storageRef.child('Ece140b/user1/pic0').getMetadata().then(function(metadata){
      console.log(metadata)
      console.log(metadata.updated)
      const html = `
        ${metadata.updated}
      `
      photo0.innerHTML = html;
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic1').getMetadata().then(function(metadata){
      console.log(metadata)
      console.log(metadata.updated)
      const html = `
        ${metadata.updated}
      `
      photo1.innerHTML = html;
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic2').getMetadata().then(function(metadata){
      console.log(metadata)
      console.log(metadata.updated)
      const html = `
        ${metadata.updated}
      `
      photo2.innerHTML = html;
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic3').getMetadata().then(function(metadata){
      console.log(metadata)
      console.log(metadata.updated)
      const html = `
        ${metadata.updated}
      `
      photo3.innerHTML = html;
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic4').getMetadata().then(function(metadata){
      console.log(metadata)
      console.log(metadata.updated)
      const html = `
        ${metadata.updated}
      `
      photo4.innerHTML = html;
    }).catch(err => {
      console.log(err.message)
    })

// add pictures
    storageRef.child('Ece140b/user1/pic0').getDownloadURL().then(function(url){
      //console.log(url)
      var img = document.getElementById('pic0');
      img.src = url;
      console.log('pic0 done')
    }).catch(err => {
      console.log(err.message)
    })
  
    storageRef.child('Ece140b/user1/pic1').getDownloadURL().then(function(url){
      //console.log(url)
      var img = document.getElementById('pic1');
      img.src = url;
      console.log('pic1 done')
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic2').getDownloadURL().then(function(url){
      //console.log(url)
      var img = document.getElementById('pic2');
      img.src = url;
      console.log('pic2 done')
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic3').getDownloadURL().then(function(url){
      //console.log(url)
      var img = document.getElementById('pic3');
      img.src = url;
      console.log('pic3 done')
    }).catch(err => {
      console.log(err.message)
    })

    storageRef.child('Ece140b/user1/pic4').getDownloadURL().then(function(url){
      //console.log(url)
      var img = document.getElementById('pic4');
      img.src = url;
      console.log('pic4 done')
    }).catch(err => {
      console.log(err.message)
    })

    // toggle Ui Elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutlinks.forEach(item => item.style.display = 'none');
  } else {
    //hide admin items
    adminItems.forEach(item => item.style.display = 'none');
    // hide account info
    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutlinks.forEach(item => item.style.display = 'block');
  }
}

// set up guides
const setupGuides = (data) => {
  if(data.length) {
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
    <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">${guide.content}</div>
    </li>
    `;
    html += li;
  });

  guideList.innerHTML = html
} else {
  guideList.innerHTML = '<h5 class="lead center-align" style="margin: 40px auto; max-width: 300px"></h5>'
}
};

// set up pictures




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

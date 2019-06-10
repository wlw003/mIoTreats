// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole_funct = functions.httpsCallable('addAdminRole')
    addAdminRole_funct({ email: adminEmail}).then(result => {
        console.log(result);
    });
});


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //check if admin
        user.getIdTokenResult().then(idTokenResult => {
            console.log(idTokenResult)
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        //get data
        db.collection('users').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message)
        });
    } else {
        setupUI()
        setupGuides([]);
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('users').add({
        title: createForm['title'].value,
        // title and content taken from class
        content: createForm['content'].value
    }).then(() => {
        //close model and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message)
    });
});


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('devices').doc(cred.user.uid).set({
            deviceID: signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close modal and reset
        // const modal = document.querySelector('#modal-login');
        // M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});

//Set times
const timeForm = document.querySelector('#time-form');
timeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user unique id
    const user = auth.currentUser;
    console.log(user.uid);
    db.collection('deviceTime').doc(user.uid).set({
        date: timeForm['user-date'].value,
        time: timeForm['user-time'].value
    }).then(() => {
        const modal = document.querySelector('#modal-time');
        M.Modal.getInstance(modal).close();
        timeForm.reset();
        timeForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        timeForm.querySelector('.error').innerHTML = err.message;
    });
    setupUI(user);  
    console.log("Time Set!")
});








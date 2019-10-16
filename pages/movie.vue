<template>
<div class="hello">
    <div class="container">
        <h3>Movies to watch</h3>
        <div class="row">
            <div class=" col-md-6 col-md-offset-3">
                <input placeholder="add movie" @keyup.enter="addMovie" type="text" v-model="movie" class="form-control">

                <ul>
                    <li v-for="(movie,key) in fireData" :key=key>
                        <div>
                            <h2>{{movie.name}}</h2>

                            <button class="btn btn-xs btn-primary" @click='editFormMode.push(key);'>Edit</button>
                            <button class="btn btn-xs btn-danger" @click='deleteMovie(key);'>Delete</button>
                            <br><br>

                            <input v-if='editFormMode.includes(key)' type="text" v-model='editingMovie[key]' @keyup.enter='editMovie(key)' class="form-control">
                        </div>

                    </li>

                </ul>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import {
    db
} from '~/plugins/firebaseConfig.js'

export default {
    data() {
        return {
            movies: [],
            movie: null,
            fireData: [],
            editingMovie: [],
            editFormMode: []
        }
    },
    methods: {
        addMovie() {
            this.movies.push(this.movie);
            // firebase.database().ref('movies').push({
            //     name: this.movie
            // });

            db.collection("movies").doc().set({
                    name: this.movie
                })
                .then((docRef) => {
                    // console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

            this.movie = null;

        },

        editMovie(key) {
            firebase.database().ref('movies/' + key).set({
                    name: this.editingMovie[key]
                })
                .then((data) => {
                    this.editingMovie[key] = null;
                    this.editFormMode = [];
                })
        },

        deleteMovie(key) {
            firebase.database().ref('movies/' + key).remove();
        },

        fetchFirebaseData() {
            // firebase.database().ref('movies').on('value', (snapshot) => {
            //     this.fireData = snapshot.val();
            // });

            // db.collection("movies").get().then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         this.fireData.push(doc.data())
            //     });
            // });

            // db.collection("movies").onSnapshot( (doc)=> {
            //     console.log("Current data: ", doc.data());
            //     this.fireData.push(doc.data())
            // });
            
            db.collection("movies")
                .onSnapshot((querySnapshot) => {
                    var mv = [];
                    querySnapshot.forEach((doc) => {
                        mv.push(doc.data());
                    });
                    // console.log('mv.length')
                    // console.log(mv.length)
                    this.fireData = mv
                    // console.log('this.fireData.length')
                    // console.log(this.fireData.length)
                })
             
        }

    },

    created() {
        console.log('===== mounted =====')
        console.log(this.fireData)
        this.fetchFirebaseData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>

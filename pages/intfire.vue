<template>
<v-form ref="form" lazy-validation @submit.prevent="addData">
    <v-text-field v-model="name" :counter="10" label="Name" required></v-text-field>
    <v-text-field v-model="price" type="number" label="Price" required></v-text-field>

    <v-btn color="success" class="mr-4" type="submit">
        Validate
    </v-btn>
    <div class="d-flex flex-wrap">
        <v-card v-for="(data,key) in fireData" :key=key elevation="1" loading="true" max-width="344" class="ma-2 pa-4">
            <v-card-tile class="headline">{{data.name}}</v-card-tile>
            <v-card-text>{{data.price}}</v-card-text>
        </v-card>
    </div>
</v-form>
</template>

<script>
import firebase from 'firebase/app'
import {
    db
} from '~/plugins/firebaseConfig.js'

export default {
    data() {
        return {
            name: '',
            price: 0,

            fireData: [],

        }
    },
    created() {
        this.getData()
    },
    methods: {
        addData() {
            db.collection("inttt").doc().set({
                    name: this.name,
                    price: Number.parseInt(this.price)
                })
                .then((docRef) => {
                    // console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        },
        getData() {
            db.collection("inttt").orderBy("name")
                .onSnapshot((querySnapshot) => {
                    var data = [];
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    this.fireData = data
                })
        }
    }

}
</script>

<style>

</style>

<template>
    <div id="survey-container">
        Survey
        <Question v-for="item in questionsList" :key="item._id" :data="item" v-bind:result.sync="result"/>
    </div>
</template>

<script>
import { getAllQuestionsApi } from '../../../api/questionsApi';

import Question from "./Question"

export default {
    name: 'Survey',
    components:{
        Question
    },
    data: function () {
        return {
            questionsList: [],
            result:''
        };
    },
    mounted: function () {
        this.getAllQuestions();
    },
    methods: {
        async getAllQuestions() {
            let res = await getAllQuestionsApi();
            console.log(res);
            if(res.success){
                this.questionsList = res.data
            }
        }
    }
};
</script>

<style lang="scss">
#survey-container {
    width: 100%;
    min-height: 600px;
    border: 1px solid red;
}
</style>
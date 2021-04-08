<template>
    <div id="survey-container">
        <Question v-for="item in questionsList" :key="item._id" :data="item" v-bind:result="result" v-on:update:result="result = $event" />
        <el-button @click="submit">提交</el-button>
    </div>
</template>

<script>
import { getAllQuestionsApi } from '../../../api/questionsApi';

import Question from './Question';

export default {
    name: 'Survey',
    components: {
        Question
    },
    data: function () {
        return {
            questionsList: [],
            result: ''
        };
    },
    mounted: function () {
        this.getAllQuestions();
    },
    methods: {
        async getAllQuestions() {
            let res = await getAllQuestionsApi();
            console.log(res);
            if (res.success) {
                this.questionsList = res.data;
            }
        },
        async submit() {
            alert(this.result);
        }
    }
};
</script>

<style lang="scss">
#survey-container {
    width: 100%;
    min-height: 600px;
    // border: 1px solid red;
    background-color: #fdfdfd;
    padding: 30px 40px 66px 40px;
}
</style>
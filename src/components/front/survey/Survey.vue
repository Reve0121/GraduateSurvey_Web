<template>
    <div id="survey-container">
        <Question v-for="item in questionsList" :key="item._id" :data="item" @setQuestionResult="setQuestionResult" />
        <el-button @click="submit">提交</el-button>
    </div>
</template>

<script>
import { getAllQuestionsApi, submitQuestionsApi } from '../../../api/questionsApi';

import Question from './Question';

export default {
    name: 'Survey',
    components: {
        Question
    },
    data: function () {
        return {
            questionsList: []
        };
    },
    mounted: function () {
        this.getAllQuestions();
    },
    methods: {
        async getAllQuestions() {
            let res = await getAllQuestionsApi();
            console.log('getAllQuestions--------->', res);
            if (res.success) {
                this.questionsList = res.data;
                this.questionsList.forEach((item) => {
                    this.$set(item, 'result', '');
                });
                console.log('this.questionsList-------->', this.questionsList);
            }
        },
        setQuestionResult(id, val) {
            this.questionsList.forEach((item) => {
                if (item._id === id) {
                    item.result = val;
                }
            });
        },
        async submit() {
            const userId = localStorage.getItem('stuID');
            console.log('userId--------->', userId);
            console.log('this.questionsList submit-------->', this.questionsList);
            let params = {};
            params.studentId = userId;
            params.survey = this.questionsList;
            params.status = 2;
            // alert(this.result);
            let res = await submitQuestionsApi(params);
            if (res.success) {
                alert('提交成功');
                console.log(res);
            }
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
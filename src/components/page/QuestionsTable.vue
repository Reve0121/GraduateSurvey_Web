<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 问卷管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="handleEdit(-1, {})">新增问题</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column prop="serialNumber" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="question" label="问题" width="auto" align="center"></el-table-column>
                <el-table-column prop="answerA" label="A" width="100" align="center"></el-table-column>
                <el-table-column prop="answerB" label="B" width="100" align="center"></el-table-column>
                <el-table-column prop="answerC" label="C" width="100" align="center"></el-table-column>
                <el-table-column prop="answerD" label="D" width="100" align="center"></el-table-column>
                <el-table-column prop="level" label="等级" width="80" align="center"></el-table-column>
                <el-table-column align="center" label="是否必填" width="80">
                    <template slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.required" disabled />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否显示" width="80">
                    <template slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.active" disabled />
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="query.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="问题">
                    <el-input v-model="form.question"></el-input>
                </el-form-item>
                <el-form-item label="答案A">
                    <el-input v-model="form.answerA"></el-input>
                </el-form-item>
                <el-form-item label="答案B">
                    <el-input v-model="form.answerB"></el-input>
                </el-form-item>
                <el-form-item label="答案C">
                    <el-input v-model="form.answerC"></el-input>
                </el-form-item>
                <el-form-item label="答案D">
                    <el-input v-model="form.answerD"></el-input>
                </el-form-item>
                <el-form-item label="等级">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item label="是否必填">
                    <input type="checkbox" v-model="form.required" />
                </el-form-item>
                <el-form-item label="是否显示">
                    <input type="checkbox" v-model="form.active" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
 
import { getAllQuestionsApi, addQuestionsApi,updateQuestionsApi } from '../../api/questionsApi';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 0
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,

            form: {},
            idx: -1,
            id: -1,
            editRow: null
        };
    },
    created() {
        this.getAllquestions();
    },
    methods: {
        // 获取所有问题
        async getAllquestions() {
            let res = await getAllQuestionsApi();
            console.log(res);
            this.tableData = res.data;
            this.query.pageTotal = res.data.length || 50;
        },
        // 触发搜索按钮
        // handleSearch() {
        //     this.$set(this.query, 'pageIndex', 1);
        //     this.getData();
        // },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editRow = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
        },
        cancelEdit() {
            this.editVisible = false;
            this.$set(this.tableData, this.idx, this.form);
        },
        // 保存编辑
        async saveEdit() {
            this.editVisible = false;
            this.idx < 0 ? this.tableData.push(this.form) : this.$set(this.tableData, this.idx, this.form);
            console.log(this.form);
            let res = this.form._id ? await this.updateQuestion() : await this.addNewQuestion();
            res ? this.$message.success(`新增成功`) : this.$message.success(`新增失败`);
        },
        async updateQuestion() {
            let res = await updateQuestionsApi(this.form);
            console.log("res",res);
            return res.success;
        },
        async addNewQuestion() {
            let res = await addQuestionsApi(this.form);
            console.log("res",res);
            return res.success;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>

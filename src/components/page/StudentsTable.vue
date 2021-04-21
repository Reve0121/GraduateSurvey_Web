<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 学生信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <!-- <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="/*handleAddData()*/ handleEdit(-1, {})">新增学生信息</el-button>
            </div>
            <el-table
                :data="tableData"
                :lazy="true"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="30" align="center"></el-table-column>
                <el-table-column prop="studentId" label="学号" width="120" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="80"></el-table-column>
                <el-table-column prop="sex" label="性别" width="60"></el-table-column>
                <el-table-column prop="major" label="专业"></el-table-column>
                <el-table-column prop="college" label="学院"></el-table-column>
                <el-table-column prop="phone" label="联系方式"></el-table-column>
                <el-table-column prop="employmentStatus" label="毕业去向"></el-table-column>
                <el-table-column prop="enterprise" label="单位名称"></el-table-column>
                <el-table-column prop="enterpriseType" label="单位性质"></el-table-column>
                <el-table-column prop="enterpriseAddress" label="单位地址"></el-table-column>
                <el-table-column prop="enterprisePhone" label="单位联系方式"></el-table-column>
                <el-table-column prop="reportEnterprise" label="报到证所在单位"></el-table-column>
                <el-table-column prop="reportAddress" label="报到证迁往地"></el-table-column>
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
                    </template>
                </el-table-column> -->

                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column> -->

                <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->
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
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <!-- <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item> -->

                <!-- 修改 编辑页面修改 -->
                <el-form-item label="学号">
                    <el-input v-model="form.studentId"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="form.college"></el-input>
                </el-form-item>
                <el-form-item label="毕业去向">
                    <el-input v-model="form.employmentStatus"></el-input>
                </el-form-item>
                <el-form-item label="单位名称">
                    <el-input v-model="form.enterprise"></el-input>
                </el-form-item>
                <el-form-item label="单位性质">
                    <el-input v-model="form.enterpriseType"></el-input>
                </el-form-item>
                <el-form-item label="单位地址">
                    <el-input v-model="form.enterpriseAddress"></el-input>
                </el-form-item>
                <el-form-item label="单位联系方式">
                    <el-input v-model="form.enterprisePhone"></el-input>
                </el-form-item>
                <el-form-item label="报到证所在单位">
                    <el-input v-model="form.reportEnterprise"></el-input>
                </el-form-item>
                <el-form-item label="报到证迁往地">
                    <el-input v-model="form.reportAddress"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增弹出框 -->
        <el-dialog :data="addData" title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="学号">
                    <el-input v-model="form._id"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="毕业去向">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="单位名称">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="单位性质">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="单位地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="单位联系方式">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="报到证所在单位">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="报到证迁往地">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAllStudentsApi, daleteStudentsApi, updateStudentsApi, addStudentsApi } from '../../api/studentsApi';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            addData: [],
            multipleSelection: [],
            delList: [],
            //test
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getAllStudents();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        async getAllStudents() {
            let res = await getAllStudentsApi(this.query);
            console.log(res);
            this.tableData = res.data.students || [];
            this.pageTotal = res.data.count || 0;
            var tableData = this.tableData;
            console.log(tableData);
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            console.log(this.tableData[index]);
            // let studentId = this.tableData[index]._id;
            // console.log(studentId);
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    let studentId = this.tableData[index].studentId;
                    let res = await daleteStudentsApi({ id: studentId });
                    console.log(res);
                    if (res.success) {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //新增学生信息
        handleAddData() {
            this.addVisible = true;
            console.log(this.addData);
        },
        //修改学生信息
        //handleUpdata(index, row) {},
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
        // 保存&编辑
        async saveEdit() {
            this.editVisible = false;
            console.log('保存编辑------------>', this.tableData[this.idx]);
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.idx < 0 ? this.tableData.push(this.form) : this.$set(this.tableData, this.idx, this.form);
            console.log(this.form);
            //获取弹出表单里的内容
            // let studentId = this.tableData[this.idx].studentId;
            // let name = this.tableData[this.idx].name;
            // let sex = this.tableData[this.idx].sex;
            // let college = this.tableData[this.idx].college;
            // let employmentStatus = this.tableData[this.idx].employmentStatus;
            // let enterprise = this.tableData[this.idx].enterprise;
            // let enterpriseType = this.tableData[this.idx].enterpriseType;
            // let enterpriseAddress = this.tableData[this.idx].enterpriseAddress;
            // let enterprisePhone = this.tableData[this.idx].enterprisePhone;
            // let reportEnterprise = this.tableData[this.idx].reportEnterprise;
            // let reportAddress = this.tableData[this.idx].reportAddress;

            let studentId = this.form.studentId;
            let name = this.form.name;
            let sex = this.form.sex;
            let college = this.form.college;
            let employmentStatus = this.form.employmentStatus;
            let enterprise = this.form.enterprise;
            let enterpriseType = this.form.enterpriseType;
            let enterpriseAddress = this.form.enterpriseAddress;
            let enterprisePhone = this.form.enterprisePhone;
            let reportEnterprise = this.form.reportEnterprise;
            let reportAddress = this.form.reportAddress;
            let res = this.form._id
                ? await updateStudentsApi({
                      studentId: studentId,
                      name: name,
                      sex: sex,
                      college: college,
                      employmentStatus: employmentStatus,
                      enterprise: enterprise,
                      enterpriseType: enterpriseType,
                      enterpriseAddress: enterpriseAddress,
                      enterprisePhone: enterprisePhone,
                      reportEnterprise: reportEnterprise,
                      reportAddress: reportAddress
                  })
                : await addStudentsApi();
            console.log(this.form.name);
            console.log('res----------->', res);
            res ? this.$message.success(`新增成功`) : this.$message.success(`新增失败`);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getAllStudents();
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

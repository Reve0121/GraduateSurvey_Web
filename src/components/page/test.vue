<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 学生信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                :lazy="true"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
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
    </div>
</template>

<script>
import { getAllStudentsApi } from '../../api/studentsApi';
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

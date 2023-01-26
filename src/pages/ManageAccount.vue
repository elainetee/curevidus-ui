<template>
  <q-page padding>
    <div >
      <div class="row justify-end q-pa-md q-gutter-sm">
        <!-- <q-btn
          outline
          style="color: green"
          label="Create acc"
          @click="$router.push('/register')"
        >
        </q-btn> -->
      </div>
      <div class="q-pa-md">
        <q-table
          title="Staff"
          :rows="users"
          :columns="columns"
          row-key="email"
          :filter="filter"
          :key="tableKey"
        >
          <template v-slot:top>
            <div style="width: 100%" class="row">
              <div class="col-9">Accounts</div>
              <div class="col-3">
                <q-input dense debounce="400" color="primary" v-model="filter">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td>
              <div class="text-center">
                <q-btn
                  icon="edit"
                  no-caps
                  flat
                  dense
                  @click="visitUserPage(props)"
                />
              </div>
            </q-td>
            <q-td>
              <div class="text-center">
                <q-btn
                  icon="delete"
                  color="red"
                  no-caps
                  flat
                  dense
                  @click="deleteStaff(props)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";

export default {
  data() {
    return {
      tableKey: 0,
      accessDenied: false,
      show_dialog: false,
      filter: "",
      options: [],
      users: [],
      columns: [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          align: "center",
          sortable: true,
        },
        {
          name: "role",
          label: "Role",
          field: "role_name",
          align: "center",
          sortable: true,
        },
        {
          name: "tel_no",
          label: "Telephone no.",
          field: "tel_no",
          align: "center",
        },
        {
          name: "quarantine_day",
          label: "Quarantine Day",
          field: "quarantine_day",
          align: "center",
        },
        // {
        //   name: "vac_status",
        //   label: "Vaccination Status",
        //   field: "vac_status",
        //   align: "center",
        // },
        { name: "action", label: "Edit", align: "center", field: "action" },
        { name: "delete", label: "Delete", align: "center", field: "action" },
      ],
    };
  },

  methods: {
    async getUser() {
      try {
        const res = await this.$axios.get(
          `http://127.0.0.1:8000/api/alluser`,
          {
            headers: { Authorization: "Bearer" + Cookies.get("token") },
          }
        );
        this.users = res.data;
        // console.log(this.users);
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          this.accessDenied = true;
        }
      }
    },

    deleteStaff(props) {
      this.$q
        .dialog({
          message: "Are you sure to delete this account?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const res = await this.$axios.delete(
              `http://127.0.0.1:8000/api/user/` + props.row.id,
              {
                headers: { Authorization: "Bearer" + Cookies.get("token") },
              }
            );
            this.getUser();
            alert("Account deleted");
          } catch (e) {
            console.log(e);
          }
        });
    },

    visitUserPage(props) {
      this.$router.push({
        name: "editUser",
        params: { id: props.row.id },
      });
    },

    // editStaff(props) {
    //   this.$q
    //     .dialog({
    //       component: editStaff,
    //       componentProps: {
    //         title: "Edit Staff",
    //         user: props.row,
    //         tableKeys: this.tableKey,
    //       },
    //     })
    //     .onOk(async (e) => {
    //       // let { client } = e;
    //       // this.getClient();
    //       alert("Update successfully");
    //       window.location.reload();
    //     });
    // },

    // editAccess(props) {
    //   var myArr = [];
    //   if (props.row.company_id){
    //   var a = props.row.company_id.toString();
    //   if (a.indexOf(",") > -1) {
    //     myArr = a.split(",").map(Number);
    //   } else {
    //     myArr.push(props.row.company_id);
    //   }
    //   }else{
    //     myArr = [];
    //   }
    //   const arr = [];
    //   for (var i = 0; i < this.options.length; i++) {
    //     arr.push({ label: this.options[i].name, value: this.options[i].id });
    //   }
    //   this.$q
    //     .dialog({
    //       title: "Access to",
    //       message: "Choose company that you want to give access to this staff",
    //       options: {
    //         model: myArr,
    //         items: arr,
    //         type: "checkbox",
    //       },
    //       cancel: true,
    //     })
    //     .onOk(async (options) => {
    //       try {
    //         let access = options.toString();
    //         const res = await this.$axios.patch(
    //           `${process.env.API}/api/admin/access/` + props.row.id,
    //           { access },
    //           {
    //             headers: { Authorization: "Bearer" + Cookies.get("token") },
    //           }
    //         );
    //         this.data = res.data;
    //         this.getUser();
    //         alert("Changes saved");
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     });
    // },
  },

  watch: {
    $route(to, from) {
      this.getUser();
    },
  },

  created() {
    this.getUser();
    // this.getComName();
  },
};
</script>

<style>
a:link,
a:visited {
  color: green;
  text-decoration: none;
}
</style>

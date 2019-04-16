<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Listview</title>
</head>
<body>
  <div id="app">
    <listview v-bind="listviewConfig" />
  </div>

  <script src="https://unpkg.com/vue@2/dist/vue.min.js"></script>
  <script src="https://unpkg.com/@laomao800/vue-listview@<%= listviewVersion %>/dist/listview.umd.min.js"></script>
  <script>
  new Vue({
    data: {
      listviewConfig: <%= listviewConfig %>
    }
  }).$mount('#app')
  </script>
</body>
</html>

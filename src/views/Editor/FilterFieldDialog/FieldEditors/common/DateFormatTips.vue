<template functional>
  <ElCollapse accordion>
    <ElCollapseItem>
      <template slot="title">
        <div style="font-size:14px;color:#666;">
          <i class="header-icon el-icon-date" />
          日期格式查看
        </div>
      </template>
      <table class="table" width="100%">
        <thead><tr><th>格式可用值</th><th>含义</th><th>备注</th><th>举例</th></tr></thead>
        <tbody>
          <tr><td><code>yyyy</code></td><td>年</td><td /><td>2017</td></tr>
          <tr><td><code>M</code></td><td>月</td><td>不补0</td><td>1</td></tr>
          <tr><td><code>MM</code></td><td>月</td><td /><td>01</td></tr>
          <tr><td><code>W</code></td><td>周</td><td>仅周选择器的 <code>format</code> 可用；不补0</td><td>1</td></tr>
          <tr><td><code>WW</code></td><td>周</td><td>仅周选择器的 <code>format</code> 可用</td><td>01</td></tr>
          <tr><td><code>d</code></td><td>日</td><td>不补0</td><td>2</td></tr>
          <tr><td><code>dd</code></td><td>日</td><td /><td>02</td></tr>
          <tr><td><code>H</code></td><td>小时</td><td>24小时制；不补0</td><td>3</td></tr>
          <tr><td><code>HH</code></td><td>小时</td><td>24小时制</td><td>03</td></tr>
          <tr><td><code>h</code></td><td>小时</td><td>12小时制，须和 <code>A</code> 或 <code>a</code> 使用；不补0</td><td>3</td></tr>
          <tr><td><code>hh</code></td><td>小时</td><td>12小时制，须和 <code>A</code> 或 <code>a</code> 使用</td><td>03</td></tr>
          <tr><td><code>m</code></td><td>分钟</td><td>不补0</td><td>4</td></tr>
          <tr><td><code>mm</code></td><td>分钟</td><td /><td>04</td></tr>
          <tr><td><code>s</code></td><td>秒</td><td>不补0</td><td>5</td></tr>
          <tr><td><code>ss</code></td><td>秒</td><td /><td>05</td></tr>
          <tr><td><code>A</code></td><td>AM/PM</td><td>大写</td><td>AM</td></tr>
          <tr><td><code>a</code></td><td>am/pm</td><td>小写</td><td>am</td></tr>
          <tr><td><code>timestamp</code></td><td>JS时间戳</td><td>仅“提交格式”可用；<br>组件绑定值为<code>number</code>类型</td><td>1483326245000</td></tr>
        </tbody>
      </table>
    </ElCollapseItem>
  </ElCollapse>
</template>

<style lang="less" scoped>
.table {
  border-collapse: collapse;
  border: solid #e9edf4;
  border-width: 1px 0 0 1px;

  th,
  td {
    padding: 6px 10px;
    font-size: 14px;
    line-height: 1.4em;
    text-align: left;
    border: solid #e9edf4;
    border-width: 0 1px 1px 0;
  }
  th {
    font-weight: bold;
    background-color: #f1f1f1;
  }

  code {
    padding: 0 4px;
    background: #f9fafc;
    border: 1px solid #e8eefa;
    border-radius: 4px;
  }
}
</style>

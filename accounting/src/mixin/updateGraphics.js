export default {
    props: ["dataGraph"],
    data() {
        return {
            chart: {}
        };
    },
    computed: {
        updateGraph() {
            this.chart.validateNow(true);
        },
        setData() {
            return this.dataGraph;
        }
    },
    watch: {
        dataGraph: function(newVal, oldVal) {
            this.chart.dataProvider = this.setData;
            this.updateGraph;
        }
    }
}
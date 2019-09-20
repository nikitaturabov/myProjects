<template>
  <a :href="`feed://form/template/${type}/${template.id}/show`" class="html-template">
	  <div class="html-template__head">
			<span class="html-template__mark">html</span>
			<button class="html-template__btn" @click.stop.prevent="closeTemplate">
				<svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="7.55753" height="0.927581" rx="0.463791" transform="matrix(0.707102 -0.707111 0.707102 0.707111 0 5.34375)" fill="white"/>
					<rect width="7.55753" height="0.927581" rx="0.463791" transform="matrix(-0.707102 -0.707111 0.707102 -0.707111 5.3457 6)" fill="white"/>
				</svg>
			</button>
		</div>
		<svg class="html-template__icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M17.6934 10.0009H6.325V12.5008H10.7362V20.0005H13.2625V12.5008H17.6934V10.0009Z" fill="#7C7C7C" fill-opacity="0.3"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M17.6888 0.000163932H6.32039C6.06554 -0.0031382 5.81254 0.0434762 5.57597 0.137323C5.33939 0.23117 5.12391 0.370397 4.94193 0.546986C4.75996 0.723576 4.61507 0.93404 4.51563 1.16626C4.50364 1.19426 4.49234 1.2225 4.48174 1.25097H3.23368C2.37606 1.25097 1.55356 1.5881 0.947124 2.18819C0.340691 2.78828 0 3.60218 0 4.45084V21.8001C0 22.6488 0.340691 23.4627 0.947124 24.0628C1.55356 24.6629 2.37606 25 3.23368 25H20.7663C21.6239 25 22.4464 24.6629 23.0529 24.0628C23.6593 23.4627 24 22.6488 24 21.8001V4.45084C24 3.60218 23.6593 2.78828 23.0529 2.18819C22.4464 1.5881 21.6239 1.25097 20.7663 1.25097H19.5021C19.4056 0.991929 19.2526 0.754154 19.0509 0.555873C18.6889 0.199923 18.1992 0.000153144 17.6888 0.000163932ZM17.1204 2.50006V5.06246H6.88881V2.50006H17.1204ZM4.3625 5.64993V3.75087H3.23368C3.04608 3.75087 2.86616 3.82461 2.7335 3.95588C2.60084 4.08715 2.52632 4.26519 2.52632 4.45084V21.8001C2.52632 21.9858 2.60084 22.1638 2.7335 22.2951C2.86616 22.4264 3.04608 22.5001 3.23368 22.5001H20.7663C20.9539 22.5001 21.1338 22.4264 21.2665 22.2951C21.3992 22.1638 21.4737 21.9858 21.4737 21.8001V4.45084C21.4737 4.26519 21.3992 4.08715 21.2665 3.95588C21.1338 3.82461 20.9539 3.75087 20.7663 3.75087H19.6214V5.64993C19.6181 6.15613 19.4135 6.64066 19.0517 6.9986C18.69 7.35654 18.2004 7.55908 17.6888 7.56236H6.32039C6.06494 7.564 5.81165 7.51584 5.57501 7.42062C5.33836 7.32541 5.12298 7.185 4.94117 7.00741C4.75937 6.82982 4.61469 6.61854 4.5154 6.38562C4.41611 6.15271 4.36415 5.90272 4.3625 5.64993Z" fill="#7C7C7C" fill-opacity="0.3"/>
		</svg>

		<span class="html-template__text">
			{{ template.text }}
		</span>
	</a>
</template>

<script>
export default {
  props: {
		template: {
			type: Object,
			default: () => ({})
		},
		type: {
			type: String,
			default: ''
		}
  },
	methods: {
		closeTemplate() {
			this.$emit('template:close');
		}
	}
}
</script>

<style lang="scss">
	.html-template {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		// padding: 7px 10px 7px 3px;
		padding: 4px 7px;

		min-height: 60px;
		min-width: 133px;
		max-width: 200px;

		text-decoration: none;

		background: #fff;
		border-radius: 6px;
	
		&__head {
			display: flex;
			justify-content: space-between;
			align-self: stretch;
		}

		&__mark {
			font-size: 10px;
			color: #bbb;

			text-transform: uppercase;
		}

		&__btn {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 12px;
			height: 12px;

			background: #919191;
			border-radius: 6px;

			cursor: pointer;
		}

		&__text {
			margin-top: 6px;

			align-self: stretch;

			font-size: 14px;
			color: #4d4d4d;
		}
	}
</style>

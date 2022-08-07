<script>
    import { onMount } from "svelte";
	import View from './View.svelte'

    export let token, quota

    let actionCreateRfq = "rfq.create"
    let actionListRfq = "rfq.list"

    let isAllowedCreateRfq, isAllowedListRfq = false

    onMount(async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/rfq/permission',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token  },
                    body: JSON.stringify({
                        "resources": [
                            actionCreateRfq,
                            actionListRfq
                        ],
						"quota": quota
                    })
                }
            );

            const data = await response.json()
            isAllowedCreateRfq = data.results[0].actions[actionCreateRfq] === "EFFECT_ALLOW"
            isAllowedListRfq = data.results[0].actions[actionListRfq] === "EFFECT_ALLOW"
		} catch (error) {
            console.log(error.message);
		}
    })

    const createRfq = async () => {
		try {
            const response = await fetch(
                'http://localhost:8080/rfq/test',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token  },
                    body: JSON.stringify({
                        "resources": [actionCreateRfq],
						"quota": quota
                    })
                }
            );

            const data = await response.json();
            if (data.results[0].actions[actionCreateRfq] === "EFFECT_ALLOW") {
                alert("You're authorized to create rfq");
            } else {
                alert("you dont have permission to create rfq");
            }
		} catch (error) {
            console.log(error.message);
		}
	};

	let page
	const handleViewClick = () => {
		page = 'view'
	}
</script>

{#if page === 'view'}
<View 
	token={token} 
	quota={quota}
/>
{:else}
<section class="text-gray-600 body-font">
    {#if isAllowedCreateRfq}
	<div class="px-5 flex flex-row rounded-md shadow">
		<button on:click={createRfq} class="w-1/3 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Create RFQ </button>
	</div>
	{/if}
    
	<div class="container px-5 py-4 mx-auto">
		<div class="flex flex-wrap -m-4">
			<div class="p-4 lg:w-1/3">
				<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-20 rounded-lg overflow-hidden text-center relative">
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Agriculture & Food</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Kebutuhan Property Prime Cailendra Hotel</h1>
					<p class="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quidem corrupti vitae. Reiciendis, sequi temporibus! Mollitia explicabo dolore delectus eum ipsa nulla autem ratione pariatur voluptate error? Nisi, provident in!.</p>
					<a class="text-indigo-500 inline-flex items-center" on:click="{ handleViewClick }" href="#">
						Detail
						<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</div>
			<div class="p-4 lg:w-1/3">
				<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-20 rounded-lg overflow-hidden text-center relative">
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Agriculture & Food</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Minyak Goreng 100 Liter</h1>
					<p class="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti alias iusto, libero id provident magni? Modi obcaecati, sint quod quasi labore necessitatibus aliquam nihil unde nemo. Sint dolore dicta possimus.</p>
					<a class="text-indigo-500 inline-flex items-center" on:click="{ handleViewClick }" href="#">
						Detail
						<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</div>
			<div class="p-4 lg:w-1/3">
				<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-20 rounded-lg overflow-hidden text-center relative">
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Office & Store Supplies</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Stone Pencil</h1>
					<p class="leading-relaxed mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aliquid velit error saepe blanditiis, perspiciatis, dolores molestiae nam fugiat repellat doloribus libero, recusandae optio. Ratione ea enim atque delectus similique.</p>
					<a class="text-indigo-500 inline-flex items-center" on:click="{ handleViewClick }" href="#">
						Detail
						<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}
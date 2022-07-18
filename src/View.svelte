<script>
	import { onMount } from "svelte";
	export let token

	let isAllowedViewRfq = false
	let actionViewRfq = "rfq.view"

	onMount(async () => {
		try {
            const response = await fetch(
                'http://localhost:8080/rfq/test',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token  },
                    body: JSON.stringify({
                        "resources": [actionViewRfq]
                    })
                }
            );

            const data = await response.json();
			isAllowedViewRfq = await data.results[0].actions[actionViewRfq] === "EFFECT_ALLOW"
		} catch (error) {
            console.log(error.message);
		}
	});
</script>

<div>
	{#if isAllowedViewRfq}
		<div>
			You're authorized to view rfq
		</div>
	{:else}
		<div class="w-full bg-fixed">
			<img src="https://http.cat/403" alt="authorize">
		</div>
	{/if}
</div>
<script>
	import RFQ from "./Rfq.svelte";

	let isLoggedIn = false;
	let token = "";

	let loading = false;
  let message
	let email = "verry.rlldev@gmail.com", password = "password" 
	let quota = 0 // !NOTE: change on this line to trigger the quota limit

	const handleLogin = async () => {
    let defToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6bnVsbCwiY2xpZW50X2lkIjoxMTE1MSwidG9rZW5fdmVyc2lvbiI6IjEuMC4wIiwidG9rZW5fdHlwZSI6Imd1ZXN0X3Rva2VuIiwiYXVkIjoiMTAwNSIsImV4cCI6MTY1ODQ3NDk2NiwianRpIjoiODM3ZmVlZmYtNWMwOC05MGZiLTA2ZmUtODE0YzI2MTM5ZDg2IiwiaWF0IjoxNjU4Mzg4NTY2LCJpc3MiOiIvZXgvdjEvYXV0aG9yaXplIn0.BGirHa2EPUby9CTvKtneZzY9hmOfq3Che8WKReuccTRwbxAN5bU_p_izLSzprtdNGabpKDFUSrVtrMZPPeME6tlFRKMwx6Fc4nCVYO_kUtYsK7CKb0M6LNjsSC797ZgafGSqMGkf0Be_WCqdfnsQExbxK6Uj-C31QzG41UX5s7IBd1ZlpvjFwu5gnCi_skcRJugIBMx7HO5dZjNTeP7QujlPB6ebbBvs5uDecMdLa0JLBWeR18X6KsYyqIhi-gh4St8CCet96S7MlfRKegu1C52mp-Ldt3i7ElQAd0tkSNbCmPiT_n_aLCXxPhvAMOJrpMYfiqKBqaSr9dvC-kxxFA'
		try {
			loading = true;
      const response = await fetch(
            'http://localhost:8080/sso/v1/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + defToken  },
                body: JSON.stringify({
                  "sso_code": "sso-ralali-group",
                  "grant_type": "login_password",
                  "email": email,
                  "password": password
                })
            }
        );

      const data = await response.json();
      if (data.name === "SUCCESS") {
        isLoggedIn = true
        token = data.data.access_token.value
      }
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	};
	
</script>

<body class="min-h-full flex items-center justify-center">
	<main >
		{#if !isLoggedIn}
		<section class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-16 w-auto" src="https://io.binus.ac.id/files/2019/07/Ralali.com-Logo-640x191.png" alt="Workflow">
				<h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
			</div>
			<form on:submit|preventDefault={handleLogin}>
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email-address" class="sr-only">Email address</label>
						<input id="email-address" name="email" bind:value={email} type="email" autocomplete="email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input id="password" name="password" bind:value={password}  type="password" autocomplete="current-password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
					</div>
				</div>
	
				<div>
					<button type="submit" value={loading ? "Loading" : "Log in"}
					disabled={loading} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<!-- Heroicon name: solid/lock-closed -->
							<svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
							</svg>
						</span>
						Sign in
					</button>
				</div>
			</form>
	</section>
		{:else}
			<RFQ
				token={token}
				quota={quota }
			/>
		{/if}
	</main>
</body>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
  </style>
<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import MealLogo from "../Logos/MealLogo.svelte";
</script>
    
    <main>
        <LogoHeader caption="Meal">
            <MealLogo/>
        </LogoHeader>
    </main>
    
    <style>
        main {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }
    </style>
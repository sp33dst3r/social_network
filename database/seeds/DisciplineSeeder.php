<?php

use Illuminate\Database\Seeder;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('disciplines')->insertOrIgnore(
            [
            [
                'discipline' => 'language',
            ],
            [
                'discipline' => 'programming',
            ],
            [
                'discipline' => 'music',
            ],
            [
                'discipline' => 'hard_science',
            ],
            [
                'discipline' => 'social_science',
            ],
            ]
        );
    }
}

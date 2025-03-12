<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgeController extends Controller
{
    // 显示所有任务
    public function index()
    {
        $jsonResponse = '{"data": "key=abc, age=24, key=sdr, age=56, key=rks, age=29, key=xyz, age=24, key=ttt, age=24"}';
        $ageData = json_decode($jsonResponse);
        $splitAgeData = explode(", ", $ageData->data);

        $ageArray = [];
        foreach ($splitAgeData as $index => $ageDatum) {
            $ageItems = explode("=", $ageDatum);
            // ['age' => ['aaa', 'bbb', 'cccc']];
            if (count($ageItems) == 2) {
                if ('age' === $ageItems[0]) {
                    $ageArray[$ageItems[1]][] = [$ageItems[1]];
                }
            }
        };
        $agesData = [];
        foreach ($ageArray as $age => $users) {
            $agesData[] = [
                'age' => $age,
                'count' => count($users),
            ];
        }

        return view('age', ['ages' => json_encode($agesData, JSON_PRETTY_PRINT)]);
    }
}

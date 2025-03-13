<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgeController extends Controller
{
    // 显示所有任务
    public function index()
    {
        $jsonResponse = '{"data": "key=abc, age=24, key=sdr, age=56, key=rks, age=29, key=xyz, age=24, key=ttt, age=24"}';
        $curlConnection = curl_init();
        curl_setopt($curlConnection, CURLOPT_URL, 'https://coderbyte.com/api/challenges/json/age-counting');
        curl_setopt($curlConnection, CURLOPT_RETURNTRANSFER, true);
        $jsonResponse = curl_exec($curlConnection);

        if (false === $jsonResponse) {
            echo 'Error when curl connection' . curl_error($curlConnection);
        }
        curl_close($curlConnection);

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

        echo json_encode($agesData, JSON_PRETTY_PRINT);
        return view('age', ['ages' => json_encode($agesData, JSON_PRETTY_PRINT)]);
    }

    public function show()
    {
        $curlConnection = curl_init();
        curl_setopt($curlConnection, CURLOPT_URL, 'https://coderbyte.com/api/challenges/json/age-counting');
        curl_setopt($curlConnection, CURLOPT_RETURNTRANSFER, true);
        $jsonResponse = curl_exec($curlConnection);
        if (false === $jsonResponse) {
            throw new \Exception('curl connection error' . curl_error($curlConnection));
        }
        curl_close($curlConnection);

        $ageJson = json_decode($jsonResponse);
        if (false === $ageJson) {
            throw new \JsonException('Fail to parse the json data');
        }

        if (!isset($ageJson->data)) {
            throw new \Exception("Data is not found");
        }

        $ageArray = explode(', ', $ageJson->data);
        $ageAggregateArray = [];

        foreach ($ageArray as $index => $ageRow) {
            $ageItems = explode("=", $ageRow);
            if (count($ageItems) === 2) {
                if ($ageItems[0] === 'age' && is_numeric($ageItems[1])) {
                    $ageAggregateArray[$ageItems[1]][] = (int)$ageItems[1];
                }
            }
        }

        $ageAggregate = [];
        foreach ($ageAggregateArray as $age => $ageAggregateRow) {
            $ageAggregate[] = [
                'age' => $age,
                'count' => count($ageAggregateRow)
            ];
        }

        header("content-type: application/json");
        echo json_encode($ageAggregate, JSON_PRETTY_PRINT);
    }
}

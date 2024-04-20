<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Member;
use App\Models\CardsCreated;
use Carbon\Carbon;


class MainController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function generate(Request $request) {
        $todayMonth = Carbon::now()->format('m-Y');
        $todayMonth = str_replace("-",".",$todayMonth);
        $codeTemplate = "1000.".$todayMonth.".";
        $cardNumber = 0;
        $cardsCreated = CardsCreated::all()->where('mmyy',$todayMonth)->toArray();
        if(count($cardsCreated) == 0) {
            $countAmount = new CardsCreated();
            $countAmount->mmyy = $todayMonth;
            $countAmount->amount_created = count($request->all());
            $countAmount->save();
        } else {
            $countAmount = CardsCreated::where('mmyy', $todayMonth)->first();
            $cardNumber = $countAmount->amount_created;
            $countAmount->amount_created = $countAmount->amount_created + count($request->all());
            $countAmount->save();
        }
        $cards = $request->all();
        $toDatabase = [];
        foreach($cards as &$card) {
            $cardNumber += 1;
            array_push($toDatabase, 
                ["No_polis" => $card['No. polis'], "Nama" => $card['Nama'], "Nama_perusahaan" => $card["Nama perusahaan"], "Berlaku_sampai" => $card['Berlaku sampai'], "Nomor_sertifikat" => $card['Nomor sertifikat'], "Jenis_kartu" => $card['Jenis kartu'], "Unique_code" => $codeTemplate.sprintf("%06d", $cardNumber)]
            );
            $card['Unique code'] = $codeTemplate.sprintf("%06d", $cardNumber);
        }
        Member::insert($toDatabase);
        return Inertia::render('Dashboard', [
            "generated" => $cards,
        ]);
    }

    public function history() {
        $cards = Member::all();
        return Inertia::render('History', [
            "cards" => $cards,
        ]);
    }
}

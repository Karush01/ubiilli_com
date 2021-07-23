<?php

namespace App\Models;

use Arr;
use Config;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    public $appends = [
        'place_huge_picture',
        'place_large_picture',
        'place_medium_picture',
        'place_small_picture',
    ];


    /**
     *
     * Записує в базу нові картинки
     *
     * @return object
     *
     * @var array
     *
     */

    public static function insertPictures($pictures, $id)
    {
        $result = array();

        $insert = [];

        //перевіримо на унікальність фотки
        $db_pictures = self::pictures(Arr::flatten($pictures))->pluck('name');

        $pics = array_diff($pictures, $db_pictures->toArray());

        //вставимо нові, якщо такі є
        foreach ($pics as $picture)
            $insert[]['name'] = $picture;

        self::insert($insert);

        foreach (self::pictures($pictures) as $item)
            $result[] = array('place_id' => $id, 'picture_id' => $item->id);

        return $result;

    }


    public static function pictures($pictures)
    {

        return self::whereIn('name', $pictures)->get();

    }

    public static function picture($name)
    {

        return self::whereName($name)->first();

    }


    /**
     * Генерує шлях до картинки
     *
     * @param string $value
     * @return string
     */
    public function getPlaceHugePictureAttribute()
    {
        return '/' . env('UPLOADS_DIR') . '/' . env('PICTURES_DIR') . '/' . env('PLACES_DIR') . '/' . Config::get('image.dirs.sizes.huge.dir') . '/' . $this->name;
    }


    /**
     * Генерує шлях до картинки
     *
     * @param string $value
     * @return string
     */
    public function getPlaceLargePictureAttribute()
    {
        return '/' . env('UPLOADS_DIR') . '/' . env('PICTURES_DIR') . '/' . env('PLACES_DIR') . '/' . Config::get('image.dirs.sizes.large.dir') . '/' . $this->name;
    }

    /**
     * Генерує шлях до картинки
     *
     * @param string $value
     * @return string
     */
    public function getPlaceMediumPictureAttribute()
    {
        return '/' . env('UPLOADS_DIR') . '/' . env('PICTURES_DIR') . '/' . env('PLACES_DIR') . '/' . Config::get('image.dirs.sizes.medium.dir') . '/' . $this->name;
    }


    /**
     * Генерує шлях до картинки
     *
     * @param string $value
     * @return string
     */
    public function getPlaceSmallPictureAttribute()
    {
        return '/' . env('UPLOADS_DIR') . '/' . env('PICTURES_DIR') . '/' . env('PLACES_DIR') . '/' . Config::get('image.dirs.sizes.small.dir') . '/' . $this->name;
    }
}

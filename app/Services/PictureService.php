<?php


namespace App\Services;

use Image;
use Config;


class PictureService
{


    public function __construct()
    {

    }


    private static function path()
    {

        return Config::get('image.dirs.uploads') . "/" . Config::get('image.dirs.pictures') . "/" . Config::get('image.dirs.places') . '/';

    }


    private static function generateFilename()
    {
        return uniqid() . "_" . md5(microtime(100) . uniqid() . time());
    }


    public function savePicture($picture)
    {


        $filename = self::generateFilename() . "." . $picture->getClientOriginalExtension();

        $image = Image::make($picture);

        //створимо всі розміра картинок

        foreach (Config::all()['image']['dirs']['sizes'] as $size)
            self::createPicture($image, self::path() . $size['dir'] . '/' . $filename, $size['width'], $size['height']);


        return '/' . self::path() . Config::all()['image']['dirs']['sizes']['medium']['dir'] . '/' . $filename;


    }

    public static function createPicture($image, $path, $width = null, $height = null)
    {

        if ($width == null && $height == null) {

            $width = $image->width();

            $height = $image->height();
        }

        $im = Image::canvas($width, $height)->insert($image->fit($width, $height), 'center');

        $im->save($path);

    }

    public static function updatePictures($pictures)
    {

        if (!is_array($pictures))
            return null;

        $images = [];

        $cover = null;

        //підготуємо масив

        foreach ($pictures as $key => $picture) {

            if (isset($picture['name'])) {
                $exist = true;


                foreach (Config::all()['image']['dirs']['sizes'] as $size)
                    $exist = file_exists(self::path() . $size['dir'] . "/" . $picture['name']) && $exist ? true : false;

                if ($exist) {

                    $images[$key] = $picture['name'];

                    if (isset($picture['isCover']) && $picture['isCover'])
                        $cover = $key;
                }

            }
        }


        if (count($images) == 0)
            return null;


        if ($cover !== null)
            $images = array($cover => $images[$cover]) + $images;

        $images = array_unique($images);

        if (count($images) == 0)
            return null;

        return $images;
    }

}

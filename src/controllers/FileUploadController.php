<?php
    if(isset($_FILES["file"]))
    {
        $file = $_FILES['file'];
        $nombre = $file['name'];
        $fileTmpPath = $file['tmp_name'];
        $fileNameCmps = explode(".", $nombre);
        $fileExtension = strtolower(end($fileNameCmps));
    
        $allowedfileExtensions = array('png', 'jpg', 'jpeg', 'pdf');
        if(in_array($fileExtension, $allowedfileExtensions))
        {
            $uploadFileDir = '../justificantes/';
            $dest_path = $uploadFileDir . $nombre;
    
            if(move_uploaded_file($fileTmpPath, $dest_path))
            {
                echo "Imagen subida correctamente";
            }
            else
            {
                echo "Imagen no subida";
            }
        }
    }

?>
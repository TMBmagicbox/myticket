# Cómo publicar las reglas de Firebase

Estas reglas todavía **no están activas** en el proyecto. Hay que pegarlas en la consola. Antes de publicar, guarda una copia de las reglas que están hoy.

El administrador queda como **gntdment@gmail.com** (la cuenta de Google de Diego). Si entras al panel con otro correo, cámbialo en `firestore.rules` en la función `isAdmin` antes de pegarlas.

## 1. Respalda lo que ya está publicado

1. Entra a [Firebase Console](https://console.firebase.google.com/) con la cuenta del proyecto **outgo-77b3e**.
2. Abre **Firestore Database** → **Reglas**.
3. Selecciona todo el texto y cópialo en un archivo en tu computadora, por ejemplo `reglas-firestore-respaldo.txt`.
4. Abre **Storage** → **Reglas** y haz lo mismo en `reglas-storage-respaldo.txt`.

Si algo sale mal, pegas ese respaldo y pulsas **Publicar** otra vez.

## 2. Publica las reglas de Firestore

1. En el mismo proyecto, abre **Firestore Database** → **Reglas**.
2. Borra el texto que hay y pega **completo** el archivo `firestore.rules` de este repositorio.
3. Pulsa **Publicar**.

## 3. Publica las reglas de Storage

1. Abre **Storage** → **Reglas**.
2. Borra el texto y pega **completo** el archivo `storage.rules`.
3. Pulsa **Publicar**.

Si Storage nunca se activó en el proyecto, puedes saltar este paso. La app no guarda fotos ahí.

## 4. Comprueba que sigue funcionando

1. Entra a Outgo con tu cuenta normal y confirma que ves tus tickets.
2. Entra a `admin-banners.html` con **gntdment@gmail.com** y confirma que puedes guardar un banner.
3. Con otra cuenta de Google, abre la app: debe ver sus propios datos y el carrusel, y no debe poder guardar banners.

## Qué hacen

- Cada persona solo lee y escribe sus tickets (`users/{su uid}/tickets`) y su perfil (`userProfiles/{su uid}`).
- Sin iniciar sesión no se lee ni se escribe nada.
- Quien ya inició sesión puede leer los banners (el carrusel está detrás del inicio de sesión) y los comercios personalizados.
- Solo gntdment@gmail.com puede cambiar banners y comercios, listar perfiles y leer los tickets de todas las cuentas. El panel los usa para contar usuarios y tickets. Firestore no deja contar sin permiso de lectura, así que esa cuenta de admin sí puede ver el contenido de los tickets.
- Storage queda cerrado.

No cambies `apiKey` ni `projectId` en la app. Estas reglas no los usan.

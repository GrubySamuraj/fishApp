PGDMP      '                 }            fishdatabase    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    49220    fishdatabase    DATABASE        CREATE DATABASE fishdatabase WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE fishdatabase;
                postgres    false            �           0    0    DATABASE fishdatabase    ACL     6   GRANT ALL ON DATABASE fishdatabase TO superfishadmin;
                   postgres    false    4811            �            1259    49233    fishes    TABLE     �   CREATE TABLE public.fishes (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    wymiarochronny numeric(5,2),
    okresrozpoczeciaochrony date,
    okreszakonczeniaochrony date,
    imgpath character varying(255)
);
    DROP TABLE public.fishes;
       public         heap    postgres    false            �            1259    49232    fishes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.fishes_id_seq;
       public          postgres    false    216            �           0    0    fishes_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.fishes_id_seq OWNED BY public.fishes.id;
          public          postgres    false    215            �            1259    49240    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    49239    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            �            1259    49249    wylowioneryby    TABLE       CREATE TABLE public.wylowioneryby (
    id integer NOT NULL,
    user_id integer,
    fish_id integer,
    photopath character varying(100),
    description character varying(255),
    title character varying(40),
    lng numeric(8,4),
    lat numeric(8,4)
);
 !   DROP TABLE public.wylowioneryby;
       public         heap    postgres    false            �            1259    49248    wylowioneryby_id_seq    SEQUENCE     �   CREATE SEQUENCE public.wylowioneryby_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.wylowioneryby_id_seq;
       public          postgres    false    220            �           0    0    wylowioneryby_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.wylowioneryby_id_seq OWNED BY public.wylowioneryby.id;
          public          postgres    false    219            $           2604    49236 	   fishes id    DEFAULT     f   ALTER TABLE ONLY public.fishes ALTER COLUMN id SET DEFAULT nextval('public.fishes_id_seq'::regclass);
 8   ALTER TABLE public.fishes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            %           2604    49243    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            &           2604    49252    wylowioneryby id    DEFAULT     t   ALTER TABLE ONLY public.wylowioneryby ALTER COLUMN id SET DEFAULT nextval('public.wylowioneryby_id_seq'::regclass);
 ?   ALTER TABLE public.wylowioneryby ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    49233    fishes 
   TABLE DATA           u   COPY public.fishes (id, name, wymiarochronny, okresrozpoczeciaochrony, okreszakonczeniaochrony, imgpath) FROM stdin;
    public          postgres    false    216   ^       �          0    49240    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          postgres    false    218           �          0    49249    wylowioneryby 
   TABLE DATA           f   COPY public.wylowioneryby (id, user_id, fish_id, photopath, description, title, lng, lat) FROM stdin;
    public          postgres    false    220   T        �           0    0    fishes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.fishes_id_seq', 4, true);
          public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    217            �           0    0    wylowioneryby_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.wylowioneryby_id_seq', 13, true);
          public          postgres    false    219            (           2606    49238    fishes fishes_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.fishes
    ADD CONSTRAINT fishes_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.fishes DROP CONSTRAINT fishes_pkey;
       public            postgres    false    216            *           2606    49245    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            ,           2606    49247    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    218            .           2606    49254     wylowioneryby wylowioneryby_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.wylowioneryby
    ADD CONSTRAINT wylowioneryby_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.wylowioneryby DROP CONSTRAINT wylowioneryby_pkey;
       public            postgres    false    220            /           2606    49260    wylowioneryby fk_fish    FK CONSTRAINT     �   ALTER TABLE ONLY public.wylowioneryby
    ADD CONSTRAINT fk_fish FOREIGN KEY (fish_id) REFERENCES public.fishes(id) ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.wylowioneryby DROP CONSTRAINT fk_fish;
       public          postgres    false    216    220    4648            0           2606    49255    wylowioneryby fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.wylowioneryby
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.wylowioneryby DROP CONSTRAINT fk_user;
       public          postgres    false    220    218    4650            �   �   x�u�M�0�u�K὾�n�[Ҁ?(��������R	���n�/3Ȫ���/L��	�q�9JN��!����Hs��!��w�G~��L��6��_!� �ȡK�i�Z�Cn�ՀR��+C�=��Mn�i�̧`�;�$)5q�U���f��Qqښg�*k���:Br�����,�޼OO�      �   &   x�3��J�.M�LLL�2�,�LJ�6�,.������ �[      �   �  x���͎�0���;�<3�<�!$�+!�I�4٦�[U�	��W�ؾ���(QG�o&�11K��3�\o��m���D���'Q�]��^ľ�#{��=0�%�������-���8j�IR�uim����/�ž���S��]� f�!lΟ_�e���{3�b>��^����mS�q��";����T����-���!�O+�k���պM�v5>�X-~��E��K��w	�]x�У��[�P��e�no-�&Ux����x��aZql�m��9�����fj���aJbr}j� *Tp���aw<���fa6g)(���%����UN�"u
ґ6� CAc��`�[䝘�к0ғ�
����b����z���R����zf�y5��r��8	ҌP�b�?����br�/�B��@�
mA�/�M}�>Lwæ
�/=Q�L�BÁ^��ZT��D*m�/������-	�E�K��5�	�     
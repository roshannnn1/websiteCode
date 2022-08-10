PGDMP                 	        z            recipedb    13.3    13.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16458    recipedb    DATABASE     l   CREATE DATABASE recipedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE recipedb;
                postgres    false            �           0    0    DATABASE recipedb    COMMENT     ;   COMMENT ON DATABASE recipedb IS 'database for recipe app';
                   postgres    false    3007            �            1259    16486    recipes    TABLE     Z  CREATE TABLE public.recipes (
    recipeid integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    ingridients text NOT NULL,
    directions text NOT NULL,
    imagename character varying DEFAULT 'default.png'::character varying NOT NULL,
    userid integer NOT NULL,
    createdat timestamp with time zone DEFAULT now()
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    16484    recipes_recipeid_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_recipeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.recipes_recipeid_seq;
       public          postgres    false    203            �           0    0    recipes_recipeid_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.recipes_recipeid_seq OWNED BY public.recipes.recipeid;
          public          postgres    false    202            �            1259    16474    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(16) NOT NULL,
    pass character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16472    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    201            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    200            *           2604    16489    recipes recipeid    DEFAULT     t   ALTER TABLE ONLY public.recipes ALTER COLUMN recipeid SET DEFAULT nextval('public.recipes_recipeid_seq'::regclass);
 ?   ALTER TABLE public.recipes ALTER COLUMN recipeid DROP DEFAULT;
       public          postgres    false    202    203    203            )           2604    16477    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    16486    recipes 
   TABLE DATA           v   COPY public.recipes (recipeid, title, description, ingridients, directions, imagename, userid, createdat) FROM stdin;
    public          postgres    false    203   �       �          0    16474    users 
   TABLE DATA           7   COPY public.users (userid, username, pass) FROM stdin;
    public          postgres    false    201   P       �           0    0    recipes_recipeid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.recipes_recipeid_seq', 10, true);
          public          postgres    false    202            �           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 9, true);
          public          postgres    false    200            2           2606    16494    recipes recipes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipeid);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    203            .           2606    16479    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            0           2606    16481    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    201            3           2606    16495    recipes fk_recipe_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT fk_recipe_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.recipes DROP CONSTRAINT fk_recipe_user;
       public          postgres    false    203    2862    201            �   �  x��UKr�6]ӧ���iS���W��T\����l�� 
 �hV9D.�]ΐ�$'I7(٦˩�(���׭E� �}�Ki1��"�F)����Ck*X��l��`zB�3��Ajؘ�� ��;c�-t��=���}p"`E���-�p,��ۨLߴ��Љ-eG�Km���lJ�@�S��b}�����W*;���(�C0R=�'����8ݡPpA�-*^�
!<7`4Y^~�`4^r�5�1� �}�p�;�SSG�w�Ut�!�{�:��;TJ A�'�D ث`/��o��G+�;M�%;�����3N@�J�^�9Y�����yA�z�:c:?���,�:0%׬�������D!F�����,)�:%��Ek�]J-'�\�M�ˇ��{���(BD��P3�E1���{Ʒ�����nuWnYw�ObEw�ɪRD�p�E���f9�Z�����ڌ�N�*ALJ�Rq��(����IӔ�?i�{�;Ii�*��
U�YE�i�����u�r�f_D8��rni/��̺xd\���$���|6�gE��V7�"ɧy~5]\Mg�ݬ�l�e��z>-����8[&��k�%h�n�Az��6tJ���$�k�}z���{ߓV�HW#ċ�8�S;�y��?XYF�bM�ֹg��I��^3���G��Q&w�T�SXGZ������M)��T�m�V��lBʭd�o""�+�%fyX�͈�[A�����Gb^(3�*��4�j�'�$�ʠ��a܆���)���,�4�k�d�:��d��ܼ&�g-	���<��;~zY��"	ÏM�&�-dc�a���~<�c+�Q`Ġ$�G.��/t]�zl�KD3��&�gZ�X�C�a����}w��5��El��������:�%tR��m��ʽ�v�;Qr&��e{�aؔE��r��_m�,G�2_e��:O3ړ��)O���ٿ�Jx�      �   b  x�5��v�0 ��k�^��e�(�V��knL9#�&O߮�������Ҁz"��R�I�,���u5ХqF��JZ�x�VWB������)�,��v�/��x/Nb��t��{l��B/�C��\/�rEU3�[��-;����V\!S�!孌�7���ƂT���3`J3�Bk�L�ސ�֋�?r��\/�6Hd�l��ˠk*�Pm�C=���[��Y�Y�n#��>h�z��E�b_A���$����h�ib����o�ŀ.����s�R{4G#/8A7�R���)����덇r�w�8��A&p�u]�����g��.3��m3�4���\��������ӵ���+j� ~ ��     